import {Stack} from '../../common/stack';
import {DarkArtsEventsCard} from './dark_arts_events_card';
import {DARK_ARTS_EVENTS_CARDS_PER_LEVEL} from './dark_arts_events_levels';

export interface DarkArtsEventsState {
  deck: Stack<DarkArtsEventsCard>;
  active: DarkArtsEventsCard | null;
  discardPile: DarkArtsEventsCard[];
}

export const getInitialDarkArtsEventsState = (): DarkArtsEventsState => ({
  deck: new Stack(DARK_ARTS_EVENTS_CARDS_PER_LEVEL[1]),
  active: null,
  discardPile: [],
});
