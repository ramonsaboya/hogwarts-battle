import {getDarkArtsEventCardAmount} from './dark_arts_event_cards_config';
import {
  DARK_ARTS_EVENT_CARDS,
  DarkArtsEventCard,
  Stack,
} from '@hogwarts-battle/common';

export interface DarkArtsEventsInternalState {
  deck: Stack<DarkArtsEventCard>;
  active: DarkArtsEventCard | null;
  discardPile: DarkArtsEventCard[];
}

export const getInitialDarkArtsEventsState =
  (): DarkArtsEventsInternalState => {
    const cards = shuffle(
      DARK_ARTS_EVENT_CARDS.reduce(
        (acc: DarkArtsEventCard[], card: DarkArtsEventCard) => {
          const amount = getDarkArtsEventCardAmount(card.name);
          return [...acc, ...new Array(amount).fill(card)];
        },
        [] as DarkArtsEventCard[]
      )
    );

    return {
      deck: new Stack(cards),
      active: null,
      discardPile: [],
    };
  };

const shuffle = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
