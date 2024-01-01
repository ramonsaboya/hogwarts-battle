import {DARK_ARTS_EVENTS_CARDS_PER_LEVEL} from './dark_arts_events_levels';
import {DarkArtsEventsState, Stack} from '@hogwarts-battle/common';

export const getInitialDarkArtsEventsState = (): DarkArtsEventsState => ({
  deck: new Stack(DARK_ARTS_EVENTS_CARDS_PER_LEVEL[1]),
  active: null,
  discardPile: [],
});
