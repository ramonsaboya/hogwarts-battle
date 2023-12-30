import {PlayerView} from '../src/game/player_view';
import {Stack} from '../common/stack';
import {VillainState, getInitialVillainState} from './villain/villains_state';

export type Hero = 'Harry' | 'Hermione' | 'Ron' | 'Neville';

export type CardType = 'SPELL' | 'ITEM' | 'ALLY';

export interface Card {
  name: string;
  description: string;
  type: CardType;
}

export interface HeroCard extends Card {
  hero: Hero;
}

export interface RegularCard extends Card {
  cost: number;
}

export interface GameState {
  villains: VillainState;
  players: {
    [playerID: number]: {
      hand: Card[];
      deck: Stack<Card>;
      discardPile: Card[];
    };
  };
}

export const getInitialGameState = (): GameState => ({
  villains: getInitialVillainState(),
  players: {},
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
