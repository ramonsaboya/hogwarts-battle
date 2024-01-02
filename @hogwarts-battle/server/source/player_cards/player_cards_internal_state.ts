import {v4 as uuidv4} from 'uuid';
import {
  PLAYER_HOGWARTS_CARDS,
  PlayerCardInstance,
  SerializedPlayerCardsExternalState,
  Stack,
  serializePlayerCardsExternalState,
  shuffle,
} from '@hogwarts-battle/common';

export interface PlayerCardsInternalState {
  availableCards: PlayerCardInstance[];
  deck: Stack<PlayerCardInstance>;
}

export function getInitialPlayerCardsState(): PlayerCardsInternalState {
  const deck = shuffle(
    PLAYER_HOGWARTS_CARDS.map(card => ({id: uuidv4(), card}))
  );

  return {
    availableCards: deck.slice(0, 6),
    deck: new Stack(deck.slice(6)),
  };
}

export function convertAndSerializePlayerCardsState(
  state: PlayerCardsInternalState
): SerializedPlayerCardsExternalState {
  return serializePlayerCardsExternalState({
    availableCards: state.availableCards,
  });
}
