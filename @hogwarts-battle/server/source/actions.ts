import {Socket} from 'socket.io';
import {createPlayerView} from './game_state';
import {Game} from './game';
import {actions as playerActions} from './player/player_actions';
import {actions as villainsActions} from './villain/villains_actions';
import {actions as darkArtsEventsActions} from './dark_arts_events/dark_arts_events_actions';
import {
  Action,
  GameState,
  PlayerID,
  ClientToServerEvents,
  ServerToClientEvents,
  SerializedPlayerView,
  PlayerView,
} from '@hogwarts-battle/common';

export type ActionListener = {
  [K in keyof Action]: [
    K,
    (
      state: GameState,
      actionArgs: Parameters<Action[K]>[0],
      playerID: PlayerID
    ) => GameState,
  ];
}[keyof Action];

export function registerListeners(
  game: Game,
  playerID: number,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) {
  const allActionListeners = [
    ...villainsActions,
    ...playerActions,
    ...darkArtsEventsActions,
  ];
  allActionListeners.forEach(([action, listener]) => {
    socket.on(
      action,
      (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        args: any,
        callback: (playerView: SerializedPlayerView) => void
      ): void => {
        console.log(action + ' action');

        if (!game.isPlayerTurn(playerID)) {
          throw new Error('Not your turn');
        }

        const oldGameState = game.gameState;
        const gameState = listener(oldGameState, args, playerID);
        game.gameState = gameState;

        callback(createPlayerView(game, playerID));
        game.broadcastPlayerViews(playerID);
      }
    );
  });

  socket.on(
    'endTurn',
    (args: {}, callback: (playerView: SerializedPlayerView) => void): void => {
      console.log('end turn action');

      if (!game.isPlayerTurn(playerID)) {
        throw new Error('Not your turn');
      }

      game.endTurn();

      callback(createPlayerView(game, playerID));
      game.broadcastPlayerViews(playerID);
    }
  );
}

export function serializePlayerView(playerView: PlayerView): string {
  return JSON.stringify(playerView);
}
