import {DarkArtsEventsCard} from '../../server/dark_arts_events/dark_arts_events_card';
import {PlayerID} from '../../server/game';
import {GameContext} from '../../server/game_context';
import {Card, Hero} from '../../server/player/player_state';
import {Villain} from '../../server/villain/villains_state';

export interface PlayerViewBasePlayer {
  hero: Hero;
  health: number;
  influenceTokens: number;
  attackTokens: number;
}

export interface PlayerViewSelfPlayer extends PlayerViewBasePlayer {
  hand: Card[];
  discardPile: Card[];
}

export interface PlayerViewOtherPlayer extends PlayerViewBasePlayer {
  playerID: PlayerID;
}

export interface GameStateView {
  player: PlayerViewSelfPlayer;
  otherPlayers: PlayerViewOtherPlayer[];
  darkArtsEvents: {
    active: DarkArtsEventsCard | null;
    discardPile: DarkArtsEventsCard[];
  };
  activeVillain: Villain;
}

export interface PlayerView {
  gameContext: GameContext;
  gameStateView: GameStateView;
}
