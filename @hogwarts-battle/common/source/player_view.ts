import {Card, Hero} from './player_state';
import {
  LocationsExternalState,
  SerializedLocationsExternalState,
  deserializeLocationsState,
  serializeLocationsState,
} from './locations/locations_external_state';
import {
  SerializedVillainsState,
  VillainsState,
  deserializeVillainsState,
  serializeVillainsState,
} from './villains_state';
import {GameContext} from './game_context';
import {
  DarkArtsEventsExternalState,
  SerializedDarkArtsEventsExternalState,
} from './dark_arts_events/dark_arts_events_external_state';

export type PlayerID = number;

export interface PlayerViewPlayer {
  playerID: PlayerID;
  hero: Hero;
  health: number;
  influenceTokens: number;
  attackTokens: number;
}

export interface PlayerViewSelfPlayer extends PlayerViewPlayer {
  hand: Card[];
  discardPile: Card[];
}

export interface PlayerView {
  gameContext: GameContext;
  gameStateView: GameStateView;
}

export interface GameStateView {
  player: PlayerViewSelfPlayer;
  otherPlayers: PlayerViewPlayer[];
  darkArtsEvents: DarkArtsEventsExternalState;
  villains: VillainsState;
  locations: LocationsExternalState;
}
interface SerializedGameStateView {
  player: PlayerViewSelfPlayer;
  otherPlayers: PlayerViewPlayer[];
  darkArtsEvents: SerializedDarkArtsEventsExternalState;
  villains: SerializedVillainsState;
  locations: SerializedLocationsExternalState;
}

export interface SerializedPlayerView {
  gameContext: GameContext;
  gameStateView: SerializedGameStateView;
}

export const serializePlayerView: (
  playerView: PlayerView
) => SerializedPlayerView = playerView => ({
  gameContext: playerView.gameContext,
  gameStateView: {
    player: playerView.gameStateView.player,
    otherPlayers: playerView.gameStateView.otherPlayers,
    darkArtsEvents: playerView.gameStateView.darkArtsEvents,
    villains: serializeVillainsState(playerView.gameStateView.villains),
    locations: serializeLocationsState(playerView.gameStateView.locations),
  },
});

export const deserializePlayerView: (
  serializedPlayerView: SerializedPlayerView
) => PlayerView = serializedPlayerView => ({
  gameContext: serializedPlayerView.gameContext,
  gameStateView: {
    player: serializedPlayerView.gameStateView.player,
    otherPlayers: serializedPlayerView.gameStateView.otherPlayers,
    darkArtsEvents: serializedPlayerView.gameStateView.darkArtsEvents,
    villains: deserializeVillainsState(
      serializedPlayerView.gameStateView.villains
    ),
    locations: deserializeLocationsState(
      serializedPlayerView.gameStateView.locations
    ),
  },
});
