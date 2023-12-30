import {Socket} from 'socket.io';
import {PlayerView} from '../../src/game/player_view';
import {createPlayerView} from '../game_state';
import {Game} from '../game';

const playCardAction = (game: Game, playerID: number, socket: Socket) => {
  socket.on(
    'play card',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (args: {cardIndex: number}, callback: (playerView: PlayerView) => {}) => {
      console.log('play card action');

      const state = game.getState();
      const playerState = state.players[playerID];

      const card = playerState.hand[args.cardIndex];
      const newHand = playerState.hand.filter((_, i) => i !== args.cardIndex);
      const newDiscardPile = [...playerState.discardPile, card];

      game.setState({
        ...state,
        players: {
          ...state.players,
          [playerID]: {
            ...playerState,
            hand: newHand,
            discardPile: newDiscardPile,
          },
        },
      });

      callback(createPlayerView(game.getState(), playerID));
      game.broadcastPlayerViews(playerID);
    }
  );
};

export const actions = {
  playCardAction,
};
