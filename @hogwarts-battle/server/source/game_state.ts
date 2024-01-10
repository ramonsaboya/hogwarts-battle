import {
  PlayersInternalState,
  convertAndSerializePlayersState,
  getInitialPlayersState,
  getInternalPlayer,
} from './player/players_internal_state';
import {
  LocationsInternalState,
  convertAndSerializeLocationsState,
  getInitialLocationsState,
} from './locations/locations_internal_state';
import {
  DarkArtsEventsInternalState,
  convertAndSerializeDarkArtsEventsState,
  getInitialDarkArtsEventsState,
} from './dark_arts_events/dark_arts_events_internal_state';
import {
  VillainsInternalState,
  convertAndSerializeVillainsState,
  getInitialVillainsState,
} from './villain/villains_internal_state';
import {Game} from './game';
import {SerializedPlayerView, TurnPhase} from '@hogwarts-battle/common';
import {
  PlayerCardsInternalState,
  convertAndSerializePlayerCardsState,
  getInitialPlayerCardsState,
} from './player_cards/player_cards_internal_state';

export interface GameState {
  turnPhase: TurnPhase;
  players: PlayersInternalState;
  playerCards: PlayerCardsInternalState;
  villains: VillainsInternalState;
  darkArtsEvents: DarkArtsEventsInternalState;
  locations: LocationsInternalState;
}

export const getInitialGameState = (): GameState => ({
  turnPhase: TurnPhase.DARK_ARTS_EVENT_REVEAL,
  players: getInitialPlayersState(),
  playerCards: getInitialPlayerCardsState(),
  villains: getInitialVillainsState(),
  darkArtsEvents: getInitialDarkArtsEventsState(),
  locations: getInitialLocationsState(),
});

export function createPlayerView(
  game: Game,
  playerID: number
): SerializedPlayerView {
  const gameState = game.gameState;

  const playerState = getInternalPlayer(gameState.players, playerID);
  if (!playerState) {
    throw new Error('Player not found');
  }

  return {
    hasGameStarted: game.hasGameStarted,
    gameContext: game.getGameContext,
    gameStateView: {
      turnPhase: gameState.turnPhase,
      players: convertAndSerializePlayersState(gameState.players, playerID),
      playerCards: convertAndSerializePlayerCardsState(gameState.playerCards),
      darkArtsEvents: convertAndSerializeDarkArtsEventsState(
        gameState.darkArtsEvents
      ),
      villains: convertAndSerializeVillainsState(gameState.villains),
      locations: convertAndSerializeLocationsState(gameState.locations),
    },
  };
}
