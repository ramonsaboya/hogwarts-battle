import {
  SerializedVillainsExternalState,
  Stack,
  VILLAIN_CARDS,
  VillainCard,
  serializeVillainsExternalState,
  shuffle,
} from '@hogwarts-battle/common';

export interface VillainsInternalState {
  deck: Stack<VillainCard>;
  activeVillain: VillainCard | null;
  discardPile: VillainCard[];
  attackTokens: number;
}

export function getInitialVillainsState(): VillainsInternalState {
  const cards = shuffle(VILLAIN_CARDS);

  return {
    deck: new Stack(cards.slice(1)),
    activeVillain: cards[0],
    discardPile: [],
    attackTokens: 0,
  };
}

export function convertAndSerializeVillainsState(
  state: VillainsInternalState
): SerializedVillainsExternalState {
  return serializeVillainsExternalState({
    deckSize: state.deck.length(),
    activeVillain: state.activeVillain,
    discardPile: state.discardPile,
    attackTokens: state.attackTokens,
  });
}
