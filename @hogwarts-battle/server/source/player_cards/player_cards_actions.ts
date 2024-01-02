import {ActionListener} from '../actions';
import {GameState} from '../game_state';
import {getInternalPlayer} from '../player/players_internal_state';
import {
  AcquireCardActionArgs,
  PlayerHogwartsCard,
  PlayerID,
} from '@hogwarts-battle/common';

const acquireCardAction: ActionListener = [
  'acquireCard',
  (
    state: GameState,
    args: AcquireCardActionArgs,
    playerID: PlayerID
  ): GameState => {
    const playerState = getInternalPlayer(state.players, playerID);
    if (!playerState) {
      throw new Error('Player not found');
    }

    const cardInstance = state.playerCards.availableCards[args.cardIndex];
    const card = cardInstance.card as PlayerHogwartsCard;
    const cost = card.cost;

    if (playerState.influenceTokens < cost) {
      return state;
    }

    const newDiscardPile = [...playerState.discardPile, cardInstance];
    const newPlayerState = {
      ...playerState,
      influenceTokens: playerState.influenceTokens - cost,
      discardPile: newDiscardPile,
    };

    state.playerCards.availableCards[args.cardIndex] =
      state.playerCards.deck.pop()!;

    const otherPlayers = state.players.filter(
      player => player.playerID !== playerID
    );

    return {
      ...state,
      players: [...otherPlayers, newPlayerState],
    };
  },
];

export const actions: ActionListener[] = [acquireCardAction];
