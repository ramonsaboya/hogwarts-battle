import {Socket} from 'socket.io';
import {PlayerView} from '../src/game/player_view';
import {createPlayerView} from './game_state';
import {Game} from './game';
import {ClientToServerEvents, ServerToClientEvents} from '../src/socket/socket';
import {actions as playerActions} from './player/player_actions';
import {actions as villainsActions} from './villain/villains_actions';
import {actions as darkArtsEventsActions} from './dark_arts_events/dark_arts_events_actions';

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (args: any, callback: (playerView: PlayerView) => void): void => {
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
    (args: {}, callback: (playerView: PlayerView) => void): void => {
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
