import {PlayerView} from '../../src/game/player_view';
import {GameState} from '../game_state';
import {PlayerID} from '../game';
import {ActionListener} from '../../src/socket/socket';
import {getPlayerState} from './player_state';

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
