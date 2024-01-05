import {Socket} from 'socket.io';
import {GameState, createPlayerView} from './game_state';
import {Game} from './game';
import {actions as playersActions} from './player/players_actions';
import {actions as playerCardsActions} from './player_cards/player_cards_actions';
import {actions as villainsActions} from './villain/villains_actions';
import {actions as darkArtsEventsActions} from './dark_arts_events/dark_arts_events_actions';
import {
  Action,
  PlayerID,
  ClientToServerEvents,
  ServerToClientEvents,
  SerializedPlayerView,
  PlayerView,
  TurnPhase,
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

export const ALLOWED_ACTIONS_PER_TURN_PHASE: Record<
  TurnPhase,
  (keyof Action)[]
> = {
  [TurnPhase.DARK_ARTS_EVENT_REVEAL]: [
    'revealDarkArtsEvent',
    'chooseDiscardCard',
  ],
  [TurnPhase.VILLAIN_EFFECTS]: ['chooseDiscardCard'],
  [TurnPhase.PLAYER_ACTIONS]: [
    'playCard',
    'attackVillain',
    'acquireCard',
    'chooseDiscardCard',
    'chooseCardEffect',
    'chooseHeroHeal',
    'endTurn',
  ],
};

export function registerListeners(
  game: Game,
  playerID: number,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) {
  const allActionListeners = [
    ...villainsActions,
    ...playersActions,
    ...playerCardsActions,
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

        const turnPhase = game.gameState.turnPhase;
        if (!ALLOWED_ACTIONS_PER_TURN_PHASE[turnPhase].includes(action)) {
          throw new Error('Not allowed action');
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

  socket.on(
    'startGame',
    (args: {}, callback: (playerView: SerializedPlayerView) => void): void => {
      console.log('start game action');

      game.startGame();

      callback(createPlayerView(game, playerID));
      game.broadcastPlayerViews(playerID);
    }
  );
}

export function serializePlayerView(playerView: PlayerView): string {
  return JSON.stringify(playerView);
}
