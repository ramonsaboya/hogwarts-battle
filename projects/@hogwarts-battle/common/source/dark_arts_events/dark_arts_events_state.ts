import {PlayerView} from '../player_view';
import {Stack} from '../stack';
import {DarkArtsEventsCard} from './dark_arts_events_card';

export interface DarkArtsEventsEvents {
  revealDarkArtsEvent: (
    args: {},
    callback: (playerView: PlayerView) => void
  ) => void;
}

export interface DarkArtsEventsState {
  deck: Stack<DarkArtsEventsCard>;
  active: DarkArtsEventsCard | null;
  discardPile: DarkArtsEventsCard[];
}
