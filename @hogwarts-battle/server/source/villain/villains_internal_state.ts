import {Stack, VILLAIN_CARDS, Villain, shuffle} from '@hogwarts-battle/common';

export interface VillainsInternalState {
  deck: Stack<Villain>;
  active: Villain;
}

export const getInitialVillainsState = (): VillainsInternalState => {
  const cards = shuffle(VILLAIN_CARDS);
  return {
    deck: new Stack(cards.slice(1)),
    active: cards[0],
  };
};
