import {Hero} from '../player/players_external_state';

export enum PlayerCardType {
  ALLY = 'ALLY',
  ITEM = 'ITEM',
  SPELL = 'SPELL',
}

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

export enum PlayerHogwartsCardName {
  ALBUS_DUMBLEDORE = 'Albus Dumbledore',
  DESCENDO = 'Descendo',
  ESSENCE_OF_DITTANY = 'Essence of Dittany',
  GOLDEN_SNITCH = 'Golden Snitch',
  INCENDIO = 'Incendio',
  LUMOS = 'Lumos',
  OLIVER_WOOD = 'Oliver Wood',
  QUIDDITCH_GEAR = 'Quidditch Gear',
  REPARO = 'Reparo',
  RUBEUS_HAGRID = 'Rubeus Hagrid',
  SORTING_HAT = 'Sorting Hat',
  WINGARDIUM_LEVIOSA = 'Wingardium Leviosa',
}

export const PLAYER_HERO_CARDS: PlayerHeroCard[] = [
  {
    name: PlayerHeroCardName.ALOHOHOMORA,
    description: 'Gain 1 influence token.',
    type: PlayerCardType.SPELL,
    hero: Hero.HARRY,
  },
  {
    name: PlayerHeroCardName.ALOHOHOMORA,
    description: 'Gain 1 influence token.',
    type: PlayerCardType.SPELL,
    hero: Hero.HERMIONE,
  },
  {
    name: PlayerHeroCardName.ALOHOHOMORA,
    description: 'Gain 1 influence token.',
    type: PlayerCardType.SPELL,
    hero: Hero.NEVILLE,
  },
  {
    name: PlayerHeroCardName.ALOHOHOMORA,
    description: 'Gain 1 influence token.',
    type: PlayerCardType.SPELL,
    hero: Hero.RON,
  },
  {
    name: PlayerHeroCardName.BERTIE_BOTTS_EVERY_FLAVOUR_BEANS,
    description: '',
    type: PlayerCardType.ITEM,
    hero: Hero.RON,
  },
  {
    name: PlayerHeroCardName.CLEANSWEEP_11,
    description: '',
    type: PlayerCardType.ITEM,
    hero: Hero.RON,
  },
  {
    name: PlayerHeroCardName.CROOCKSHANKS,
    description: '',
    type: PlayerCardType.ALLY,
    hero: Hero.HERMIONE,
  },
  {
    name: PlayerHeroCardName.FIREBOLT,
    description: '',
    type: PlayerCardType.ITEM,
    hero: Hero.HARRY,
  },
  {
    name: PlayerHeroCardName.HEDWIG,
    description: '',
    type: PlayerCardType.ALLY,
    hero: Hero.HARRY,
  },
  {
    name: PlayerHeroCardName.INVISIBILITY_CLOAK,
    description: '',
    type: PlayerCardType.ITEM,
    hero: Hero.HARRY,
  },
  {
    name: PlayerHeroCardName.MANDRAKE,
    description: '',
    type: PlayerCardType.ALLY,
    hero: Hero.NEVILLE,
  },
  {
    name: PlayerHeroCardName.PIGWIDGEON,
    description: '',
    type: PlayerCardType.ALLY,
    hero: Hero.RON,
  },
  {
    name: PlayerHeroCardName.REMEMBRALL,
    description: '',
    type: PlayerCardType.ITEM,
    hero: Hero.NEVILLE,
  },
  {
    name: PlayerHeroCardName.TALES_OF_BEEDLE_THE_BARD,
    description: '',
    type: PlayerCardType.ITEM,
    hero: Hero.HERMIONE,
  },
  {
    name: PlayerHeroCardName.TIME_TURNER,
    description: '',
    type: PlayerCardType.ITEM,
    hero: Hero.HERMIONE,
  },
  {
    name: PlayerHeroCardName.TREVOR,
    description: '',
    type: PlayerCardType.ALLY,
    hero: Hero.NEVILLE,
  },
];

export const PLAYER_HOGWARTS_CARDS: PlayerHogwartsCard[] = [
  {
    name: PlayerHogwartsCardName.ALBUS_DUMBLEDORE,
    description:
      'ALL Heroes gain 1 attack token, 1 influence token, 1 heart, and draw a card.',
    type: PlayerCardType.ALLY,
    cost: 8,
  },
  {
    name: PlayerHogwartsCardName.DESCENDO,
    description: '',
    type: PlayerCardType.SPELL,
    cost: 5,
  },
  {
    name: PlayerHogwartsCardName.ESSENCE_OF_DITTANY,
    description: '',
    type: PlayerCardType.ITEM,
    cost: 2,
  },
  {
    name: PlayerHogwartsCardName.GOLDEN_SNITCH,
    description: '',
    type: PlayerCardType.ITEM,
    cost: 5,
  },
  {
    name: PlayerHogwartsCardName.INCENDIO,
    description: '',
    type: PlayerCardType.SPELL,
    cost: 4,
  },
  {
    name: PlayerHogwartsCardName.LUMOS,
    description: '',
    type: PlayerCardType.SPELL,
    cost: 4,
  },
  {
    name: PlayerHogwartsCardName.OLIVER_WOOD,
    description: '',
    type: PlayerCardType.ALLY,
    cost: 3,
  },
  {
    name: PlayerHogwartsCardName.QUIDDITCH_GEAR,
    description: '',
    type: PlayerCardType.ITEM,
    cost: 3,
  },
  {
    name: PlayerHogwartsCardName.REPARO,
    description: '',
    type: PlayerCardType.SPELL,
    cost: 3,
  },
  {
    name: PlayerHogwartsCardName.RUBEUS_HAGRID,
    description: '',
    type: PlayerCardType.ALLY,
    cost: 4,
  },
  {
    name: PlayerHogwartsCardName.SORTING_HAT,
    description: '',
    type: PlayerCardType.ITEM,
    cost: 4,
  },
  {
    name: PlayerHogwartsCardName.WINGARDIUM_LEVIOSA,
    description: '',
    type: PlayerCardType.SPELL,
    cost: 2,
  },
];
