import {DarkArtsEventsCard} from '../../server/dark_arts_events/dark_arts_events_card';
import {PlayerID} from '../../server/game';
import {Card, Hero} from '../../server/player/player_state';
import {Villain} from '../../server/villain/villains_state';

export interface PlayerViewSelfPlayer {
  hero: Hero;
  hand: Card[];
  discardPile: Card[];
}

export interface PlayerViewOtherPlayer {
  playerID: PlayerID;
  hero: Hero;
}

export interface PlayerView {
  player: PlayerViewSelfPlayer;
  otherPlayers: PlayerViewOtherPlayer[];
  darkArtsEvents: {
    active: DarkArtsEventsCard | null;
    discardPile: DarkArtsEventsCard[];
  };
  activeVillain: Villain;
}
