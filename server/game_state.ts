import {PlayerView} from '../src/game/player_view';
import {VillainsState, getInitialVillainsState} from './villain/villains_state';
import {PlayersState, getInitialPlayersState} from './player/player_state';

export interface GameState {
  villains: VillainsState;
  players: PlayersState;
}

export const getInitialGameState = (): GameState => ({
  villains: getInitialVillainsState(),
  players: getInitialPlayersState(),
});

export function createPlayerView(
  gameState: GameState,
  playerID: number
): PlayerView {
  const playerState = gameState.players[playerID];

  return {
    activeVillain: gameState.villains.active,
    player: {
      hand: playerState.hand,
      discardPile: playerState.discardPile,
    },
  };
}
