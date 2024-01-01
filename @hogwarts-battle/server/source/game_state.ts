import {getInitialPlayersState} from './player/player_state';
import {
  LocationsInternalState,
  getInitialLocationsState,
} from './locations/locations_internal_state';
import {
  DarkArtsEventsInternalState,
  getInitialDarkArtsEventsState,
} from './dark_arts_events/dark_arts_events_internal_state';
import {
  VillainsInternalState,
  getInitialVillainsState,
} from './villain/villains_internal_state';
import {Game} from './game';
import {
  PlayerViewPlayer,
  PlayersState,
  SerializedPlayerView,
  getPlayerState,
  serializeDarkArtsEventsExternalState,
  serializeLocationsExternalState,
  serializeVillainsExternalState,
} from '@hogwarts-battle/common';

export interface GameState {
  players: PlayersState;
  villains: VillainsInternalState;
  darkArtsEvents: DarkArtsEventsInternalState;
  locations: LocationsInternalState;
}

export const getInitialGameState = (): GameState => ({
  players: getInitialPlayersState(),
  villains: getInitialVillainsState(),
  darkArtsEvents: getInitialDarkArtsEventsState(),
  locations: getInitialLocationsState(),
});

export function createPlayerView(
  game: Game,
  playerID: number
): SerializedPlayerView {
  const gameState = game.gameState;

  const playerState = getPlayerState(gameState.players, playerID);
  if (!playerState) {
    throw new Error('Player not found');
  }

  return {
    gameContext: game.getGameContext,
    gameStateView: {
      player: {
        playerID: playerState.playerID,
        hero: playerState.hero,
        health: playerState.health,
        influenceTokens: playerState.influenceTokens,
        attackTokens: playerState.attackTokens,
        hand: playerState.hand,
        discardPile: playerState.discardPile,
      },
      otherPlayers: setupOtherPlayersView(gameState, playerID),
      darkArtsEvents: serializeDarkArtsEventsExternalState(
        gameState.darkArtsEvents
      ),
      villains: serializeVillainsExternalState(gameState.villains),
      locations: serializeLocationsExternalState(gameState.locations),
    },
  };
}

function setupOtherPlayersView(
  gameState: GameState,
  playerID: number
): PlayerViewPlayer[] {
  return gameState.players
    .filter(player => player.playerID !== playerID)
    .map(player => ({
      playerID: player.playerID,
      hero: player.hero,
      health: player.health,
      influenceTokens: player.influenceTokens,
      attackTokens: player.attackTokens,
    }));
}
