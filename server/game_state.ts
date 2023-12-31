import {PlayerView, PlayerViewOtherPlayer} from '../src/game/player_view';
import {VillainsState, getInitialVillainsState} from './villain/villains_state';
import {
  PlayersState,
  getInitialPlayersState,
  getPlayerState,
} from './player/player_state';
import {
  DarkArtsEventsState,
  getInitialDarkArtsEventsState,
} from './dark_arts_events/dark_arts_events_state';
import {Game} from './game';

export interface GameState {
  players: PlayersState;
  villains: VillainsState;
  darkArtsEvents: DarkArtsEventsState;
}

export const getInitialGameState = (): GameState => ({
  players: getInitialPlayersState(),
  villains: getInitialVillainsState(),
  darkArtsEvents: getInitialDarkArtsEventsState(),
});

export function createPlayerView(game: Game, playerID: number): PlayerView {
  const gameState = game.gameState;

  const playerState = getPlayerState(gameState.players, playerID);
  if (!playerState) {
    throw new Error('Player not found');
  }

  return {
    gameContext: game.getGameContext,
    gameStateView: {
      player: {
        health: playerState.health,
        influenceTokens: playerState.influenceTokens,
        attackTokens: playerState.attackTokens,
        hero: playerState.hero,
        hand: playerState.hand,
        discardPile: playerState.discardPile,
      },
      otherPlayers: setupOtherPlayersView(gameState, playerID),
      darkArtsEvents: {
        active: gameState.darkArtsEvents.active,
        discardPile: gameState.darkArtsEvents.discardPile,
      },
      activeVillain: gameState.villains.active,
    },
  };
}

function setupOtherPlayersView(
  gameState: GameState,
  playerID: number
): PlayerViewOtherPlayer[] {
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
