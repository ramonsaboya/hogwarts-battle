import {
  PlayersExternalState,
  SerializedPlayersExternalState,
  deserializePlayersExternalState,
  serializePlayersExternalState,
} from './player/players_external_state';
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
import {
  PlayerCardsExternalState,
  deserializePlayerCardsExternalState,
  serializePlayerCardsExternalState,
} from './player_cards/player_cards_external_state';

export type PlayerID = number;

export enum TurnPhase {
  DARK_ARTS_EVENT_REVEAL = 'DARK_ARTS_EVENT_REVEAL',
  VILLAIN_EFFECTS = 'VILLAIN_EFFECTS',
  PLAYER_ACTIONS = 'PLAYER_ACTIONS',
}

export interface GameStateView {
  turnPhase: TurnPhase;
  players: PlayersExternalState;
  playerCards: PlayerCardsExternalState;
  darkArtsEvents: DarkArtsEventsExternalState;
  villains: VillainsExternalState;
  locations: LocationsExternalState;
}
interface SerializedGameStateView {
  turnPhase: TurnPhase;
  players: SerializedPlayersExternalState;
  playerCards: PlayerCardsExternalState;
  darkArtsEvents: SerializedDarkArtsEventsExternalState;
  villains: SerializedVillainsExternalState;
  locations: SerializedLocationsExternalState;
}

export interface PlayerView {
  hasGameStarted: boolean;
  gameContext: GameContext;
  gameStateView: GameStateView;
}
export interface SerializedPlayerView {
  hasGameStarted: boolean;
  gameContext: GameContext;
  gameStateView: SerializedGameStateView;
}

export const serializePlayerView: (
  playerView: PlayerView
) => SerializedPlayerView = playerView => ({
  hasGameStarted: playerView.hasGameStarted,
  gameContext: playerView.gameContext,
  gameStateView: {
    turnPhase: playerView.gameStateView.turnPhase,
    players: serializePlayersExternalState(playerView.gameStateView.players),
    playerCards: serializePlayerCardsExternalState(
      playerView.gameStateView.playerCards
    ),
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
  hasGameStarted: serializedPlayerView.hasGameStarted,
  gameContext: serializedPlayerView.gameContext,
  gameStateView: {
    turnPhase: serializedPlayerView.gameStateView.turnPhase,
    players: deserializePlayersExternalState(
      serializedPlayerView.gameStateView.players
    ),
    playerCards: deserializePlayerCardsExternalState(
      serializedPlayerView.gameStateView.playerCards
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
