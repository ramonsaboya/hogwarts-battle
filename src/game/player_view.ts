import {DarkArtsEventsCard} from '../../server/dark_arts_events/dark_arts_events_card';
import {Card} from '../../server/player/player_state';
import {Villain} from '../../server/villain/villains_state';

export interface PlayerView {
  player: {
    hand: Card[];
    discardPile: Card[];
  };
  darkArtsEvents: {
    active: DarkArtsEventsCard | null;
    discardPile: DarkArtsEventsCard[];
  };
  activeVillain: Villain;
}
