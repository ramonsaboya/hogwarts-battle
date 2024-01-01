import {
  PlayersExternalState,
  SerializedPlayersExternalState,
  deserializePlayersExternalState,
  serializePlayersExternalState,
} from './player/player_external_state';
import {
  LocationsExternalState,
  SerializedLocationsExternalState,
  deserializeLocationsExternalState,
  serializeLocationsExternalState,
} from './locations/locations_external_state';
import {GameContext} from './game_context';
import {
  DarkArtsEventsExternalState,
  SerializedDarkArtsEventsExternalState,
  deserializeDarkArtsEventsExternalState,
  serializeDarkArtsEventsExternalState,
} from './dark_arts_events/dark_arts_events_external_state';
import {
  SerializedVillainsExternalState,
  VillainsExternalState,
  deserializeVillainsExternalState,
  serializeVillainsExternalState,
} from './villains/villains_external_state';

export type PlayerID = number;

export interface PlayerView {
  gameContext: GameContext;
  gameStateView: GameStateView;
}

export interface GameStateView {
  players: PlayersExternalState;
  darkArtsEvents: DarkArtsEventsExternalState;
  villains: VillainsExternalState;
  locations: LocationsExternalState;
}
interface SerializedGameStateView {
  players: SerializedPlayersExternalState;
  darkArtsEvents: SerializedDarkArtsEventsExternalState;
  villains: SerializedVillainsExternalState;
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
    players: serializePlayersExternalState(playerView.gameStateView.players),
    darkArtsEvents: serializeDarkArtsEventsExternalState(
      playerView.gameStateView.darkArtsEvents
    ),
    villains: serializeVillainsExternalState(playerView.gameStateView.villains),
    locations: serializeLocationsExternalState(
      playerView.gameStateView.locations
    ),
  },
});

export const deserializePlayerView: (
  serializedPlayerView: SerializedPlayerView
) => PlayerView = serializedPlayerView => ({
  gameContext: serializedPlayerView.gameContext,
  gameStateView: {
    players: deserializePlayersExternalState(
      serializedPlayerView.gameStateView.players
    ),
    darkArtsEvents: deserializeDarkArtsEventsExternalState(
      serializedPlayerView.gameStateView.darkArtsEvents
    ),
    villains: deserializeVillainsExternalState(
      serializedPlayerView.gameStateView.villains
    ),
    locations: deserializeLocationsExternalState(
      serializedPlayerView.gameStateView.locations
    ),
  },
});
