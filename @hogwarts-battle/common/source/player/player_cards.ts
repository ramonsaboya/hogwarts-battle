import {Hero} from './players_external_state';

export type PlayerCardType = 'SPELL' | 'ITEM' | 'ALLY';

export interface PlayerCard {
  name: PlayerHeroCardName | PlayerHogwartsCardName;
  description: string;
  type: PlayerCardType;
}

export interface PlayerHeroCard extends PlayerCard {
  hero: Hero;
}

export interface PlayerHogwartsCard extends PlayerCard {
  cost: number;
}

export interface PlayerCardInstance {
  id: string;
  card: PlayerCard;
}

export enum PlayerHeroCardName {
  ALOHOHOMORA = 'Alohomora',
  BERTIE_BOTTS_EVERY_FLAVOUR_BEANS = 'Bertie Botts Every Flavour Beans',
  CLEANSWEEP_11 = 'Cleansweep 11',
  CROOCKSHANKS = 'Crookshanks',
  FIREBOLT = 'Firebolt',
  HEDWIG = 'Hedwig',
  INVISIBILITY_CLOAK = 'Invisibility Cloak',
  MANDRAKE = 'Mandrake',
  PIGWIDGEON = 'Pigwidgeon',
  REMEMBRALL = 'Remembrall',
  TALES_OF_BEEDLE_THE_BARD = 'Tales of Beedle the Bard',
  TIME_TURNER = 'Time Turner',
  TREVOR = 'Trevor',
}

export enum PlayerHogwartsCardName {}

export const PLAYER_HERO_CARDS: PlayerHeroCard[] = [
  {
    name: PlayerHeroCardName.ALOHOHOMORA,
    description: 'Gain 1 influence token.',
    type: 'SPELL',
    hero: Hero.HARRY,
  },
  {
    name: PlayerHeroCardName.ALOHOHOMORA,
    description: 'Gain 1 influence token.',
    type: 'SPELL',
    hero: Hero.HERMIONE,
  },
  {
    name: PlayerHeroCardName.ALOHOHOMORA,
    description: 'Gain 1 influence token.',
    type: 'SPELL',
    hero: Hero.NEVILLE,
  },
  {
    name: PlayerHeroCardName.ALOHOHOMORA,
    description: 'Gain 1 influence token.',
    type: 'SPELL',
    hero: Hero.RON,
  },
  {
    name: PlayerHeroCardName.BERTIE_BOTTS_EVERY_FLAVOUR_BEANS,
    description: '',
    type: 'ITEM',
    hero: Hero.RON,
  },
  {
    name: PlayerHeroCardName.CLEANSWEEP_11,
    description: '',
    type: 'ITEM',
    hero: Hero.RON,
  },
  {
    name: PlayerHeroCardName.CROOCKSHANKS,
    description: '',
    type: 'ALLY',
    hero: Hero.HERMIONE,
  },
  {
    name: PlayerHeroCardName.FIREBOLT,
    description: '',
    type: 'ITEM',
    hero: Hero.HARRY,
  },
  {
    name: PlayerHeroCardName.HEDWIG,
    description: '',
    type: 'ALLY',
    hero: Hero.HARRY,
  },
  {
    name: PlayerHeroCardName.INVISIBILITY_CLOAK,
    description: '',
    type: 'ITEM',
    hero: Hero.HARRY,
  },
  {
    name: PlayerHeroCardName.MANDRAKE,
    description: '',
    type: 'ALLY',
    hero: Hero.NEVILLE,
  },
  {
    name: PlayerHeroCardName.PIGWIDGEON,
    description: '',
    type: 'ALLY',
    hero: Hero.RON,
  },
  {
    name: PlayerHeroCardName.REMEMBRALL,
    description: '',
    type: 'ITEM',
    hero: Hero.NEVILLE,
  },
  {
    name: PlayerHeroCardName.TALES_OF_BEEDLE_THE_BARD,
    description: '',
    type: 'ITEM',
    hero: Hero.HERMIONE,
  },
  {
    name: PlayerHeroCardName.TIME_TURNER,
    description: '',
    type: 'ITEM',
    hero: Hero.HERMIONE,
  },
  {
    name: PlayerHeroCardName.TREVOR,
    description: '',
    type: 'ALLY',
    hero: Hero.NEVILLE,
  },
];

export const PLAYER_HOGWARTS_CARDS: PlayerHogwartsCard[] = [];
