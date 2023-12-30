import {Socket} from 'socket.io';
import {PlayerView} from '../src/game/player_view';
import {createPlayerView} from './game_state';
import {Game} from './game';
import {ClientToServerEvents, ServerToClientEvents} from '../src/socket/socket';
import {actions as villainsActions} from './villain/villains_actions';
import {actions as playerActions} from './player/player_actions';

export function registerListeners(
  game: Game,
  playerID: number,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) {
  const allActionListeners = [...villainsActions, ...playerActions];

  allActionListeners.forEach(([action, listener]) => {
    socket.on(
      action,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (args: any, callback: (playerView: PlayerView) => void): void => {
        console.log(action + ' action');

        const oldGameState = game.getState();
        const gameState = listener(oldGameState, args, playerID);
        game.setState(gameState);

        callback(createPlayerView(game.getState(), playerID));
        game.broadcastPlayerViews(playerID);
      }
    );
  });

  // villainsActions.killVillainAction(game, playerID, socket);
  // playerActions.playCardAction(game, playerID, socket);
}
