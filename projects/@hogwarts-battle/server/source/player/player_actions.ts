import {ActionListener} from '../actions';
import {
  GameState,
  PlayCardActionArgs,
  PlayerID,
  getPlayerState,
} from '@hogwarts-battle/common';

const playCardAction: ActionListener = [
  'playCard',
  (
    state: GameState,
    args: PlayCardActionArgs,
    playerID: PlayerID
  ): GameState => {
    const playerState = getPlayerState(state.players, playerID);
    if (!playerState) {
      throw new Error('Player not found');
    }

    const card = playerState.hand[args.cardIndex];
    const newHand = playerState.hand.filter((_, i) => i !== args.cardIndex);
    const newDiscardPile = [...playerState.discardPile, card];
    const newPlayerState = {
      ...playerState,
      hand: newHand,
      discardPile: newDiscardPile,
    };

    const otherPlayers = state.players.filter(
      player => player.playerID !== playerID
    );

    return {
      ...state,
      players: [...otherPlayers, newPlayerState],
    };
  },
];

export const actions: ActionListener[] = [playCardAction];
