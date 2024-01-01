import {
  SerializedVillainsExternalState,
  Stack,
  VILLAIN_CARDS,
  Villain,
  serializeVillainsExternalState,
  shuffle,
} from '@hogwarts-battle/common';

export interface VillainsInternalState {
  deck: Stack<Villain>;
  activeVillain: Villain;
  discardPile: Villain[];
}

export function getInitialVillainsState(): VillainsInternalState {
  const cards = shuffle(VILLAIN_CARDS);
  return {
    deck: new Stack(cards.slice(1)),
    activeVillain: cards[0],
    discardPile: [],
  };
}

export function convertAndSerializeVillainsState(
  state: VillainsInternalState
): SerializedVillainsExternalState {
  return serializeVillainsExternalState({
    deckSize: state.deck.length(),
    activeVillain: state.activeVillain,
    discardPile: state.discardPile,
  });
}
