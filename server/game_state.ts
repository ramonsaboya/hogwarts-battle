import {PlayerView} from '../src/game/player_view';
import {VillainsState, getInitialVillainsState} from './villain/villains_state';
import {PlayersState, getInitialPlayersState} from './player/player_state';
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
  gameState: GameState,
  playerID: number
): PlayerView {
  const playerState = gameState.players[playerID];

  return {
    player: {
      hand: playerState.hand,
      discardPile: playerState.discardPile,
    },
    darkArtsEvents: {
      active: gameState.darkArtsEvents.active,
      discardPile: gameState.darkArtsEvents.discardPile,
    },
    activeVillain: gameState.villains.active,
  };
}
