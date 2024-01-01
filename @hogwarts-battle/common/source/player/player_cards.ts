import {Hero} from './players_external_state';

export type PlayerCardType = 'SPELL' | 'ITEM' | 'ALLY';

export interface PlayerCard {
  name: string;
  type: PlayerCardType;
}

export interface HeroCard extends PlayerCard {
  hero: Hero;
}

export interface HogwartsCard extends PlayerCard {
  cost: number;
}
