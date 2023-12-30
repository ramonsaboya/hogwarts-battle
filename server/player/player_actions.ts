import {PlayerView} from '../../src/game/player_view';
import {GameState} from '../game_state';
import {PlayerID} from '../game';
import {ActionListener} from '../../src/socket/socket';

export interface PlayerEvents {
  playCard: (
    args: PlayCardActionArgs,
    callback: (playerView: PlayerView) => void
  ) => void;
}

type PlayCardActionArgs = {
  cardIndex: number;
};
const playCardAction: ActionListener = [
  'playCard',
  (
    state: GameState,
    args: PlayCardActionArgs,
    playerID: PlayerID
  ): GameState => {
    const playerState = state.players[playerID];

    const card = playerState.hand[args.cardIndex];
    const newHand = playerState.hand.filter((_, i) => i !== args.cardIndex);
    const newDiscardPile = [...playerState.discardPile, card];

    return {
      ...state,
      players: {
        ...state.players,
        [playerID]: {
          ...playerState,
          hand: newHand,
          discardPile: newDiscardPile,
        },
      },
    };
  },
];

export const actions: ActionListener[] = [playCardAction];
