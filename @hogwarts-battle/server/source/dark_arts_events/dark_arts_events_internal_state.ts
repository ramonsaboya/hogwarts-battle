import {getDarkArtsEventCardAmount} from './dark_arts_event_cards_config';
import {
  DARK_ARTS_EVENT_CARDS,
  DarkArtsEventCard,
  SerializedDarkArtsEventsExternalState,
  Stack,
  serializeDarkArtsEventsExternalState,
  shuffle,
} from '@hogwarts-battle/common';

export interface DarkArtsEventsInternalState {
  deck: Stack<DarkArtsEventCard>;
  active: DarkArtsEventCard | null;
  discardPile: DarkArtsEventCard[];
}

export function getInitialDarkArtsEventsState(): DarkArtsEventsInternalState {
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
}

export function convertAndSerializeDarkArtsEventsState(
  state: DarkArtsEventsInternalState
): SerializedDarkArtsEventsExternalState {
  return serializeDarkArtsEventsExternalState({
    deckSize: state.deck.length(),
    active: state.active,
    discardPile: state.discardPile,
  });
}
