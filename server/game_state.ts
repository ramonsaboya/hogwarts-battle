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

export function createPlayerView(
  state: GameState,
  playerID: number
): PlayerView {
  const playerState = getPlayerState(state.players, playerID);
  if (!playerState) {
    throw new Error('Player not found');
  }

  return {
    player: {
      health: playerState.health,
      influenceTokens: playerState.influenceTokens,
      attackTokens: playerState.attackTokens,
      hero: playerState.hero,
      hand: playerState.hand,
      discardPile: playerState.discardPile,
    },
    otherPlayers: setupOtherPlayersView(state, playerID),
    darkArtsEvents: {
      active: state.darkArtsEvents.active,
      discardPile: state.darkArtsEvents.discardPile,
    },
    activeVillain: state.villains.active,
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
