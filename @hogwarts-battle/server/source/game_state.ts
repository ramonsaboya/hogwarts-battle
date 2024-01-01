import {getInitialPlayersState} from './player/player_state';
import {getInitialLocationsState} from './locations/locations_state';
import {
  DarkArtsEventsInternalState,
  getInitialDarkArtsEventsState,
} from './dark_arts_events/dark_arts_events_internal_state';
import {getInitialVillainsState} from './villain/villains_state';
import {Game} from './game';
import {
  LocationsState,
  PlayerViewPlayer,
  PlayersState,
  SerializedPlayerView,
  VillainsState,
  getPlayerState,
  serializeLocationsState,
  serializeVillainsState,
} from '@hogwarts-battle/common';

export interface GameState {
  players: PlayersState;
  villains: VillainsState;
  darkArtsEvents: DarkArtsEventsInternalState;
  locations: LocationsState;
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
      darkArtsEvents: {
        active: gameState.darkArtsEvents.active,
        discardPile: gameState.darkArtsEvents.discardPile,
      },
      villains: serializeVillainsState(gameState.villains),
      locations: serializeLocationsState(gameState.locations),
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
