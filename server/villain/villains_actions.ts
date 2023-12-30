import {Socket} from 'socket.io';
import {PlayerView} from '../../src/game/player_view';
import {createPlayerView} from '../game_state';
import {Game} from '../game';

const killVillainAction = (game: Game, playerID: number, socket: Socket) => {
  socket.on(
    'kill villain',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (args: any, callback: (playerView: PlayerView) => {}) => {
      console.log('kill vilain action');

      const state = game.getState();

      const activeVillain = state.villains.active;
      console.log('killing villain: ' + activeVillain.name);

      const newDeck = state.villains.deck;
      const newVillain = newDeck.pop();
      if (!newVillain) {
        throw new Error('No more villains');
      }

      game.setState({
        ...state,
        villains: {
          deck: newDeck,
          active: newVillain,
        },
      });

      callback(createPlayerView(game.getState(), playerID));
      game.broadcastPlayerViews(playerID);
    }
  );
};

export const actions = {
  killVillainAction,
};
