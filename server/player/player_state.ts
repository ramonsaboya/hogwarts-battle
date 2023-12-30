import {Stack} from '../../common/stack';

export type Hero = 'Harry' | 'Hermione' | 'Ron' | 'Neville';

export type CardType = 'SPELL' | 'ITEM' | 'ALLY';

export interface Card {
  name: string;
  type: CardType;
}

export interface HeroCard extends Card {
  hero: Hero;
}

export interface RegularCard extends Card {
  cost: number;
}

export interface PlayerState {
  hero: Hero | null;
  hand: Card[];
  deck: Stack<Card>;
  discardPile: Card[];
}

export interface PlayersState {
  [playerID: number]: PlayerState;
}

export const getInitialPlayersState = (): PlayersState => ({});
