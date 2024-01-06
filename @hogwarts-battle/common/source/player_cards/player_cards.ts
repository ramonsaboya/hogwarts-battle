import {Hero} from '../player/players_external_state';

export enum PlayerCardType {
  ALLY = 'ALLY',
  ITEM = 'ITEM',
  SPELL = 'SPELL',
}

export type PlayerCardName = PlayerHeroCardName | PlayerHogwartsCardName;

export interface PlayerCard {
  name: PlayerCardName;
  description: string;
  type: PlayerCardType;
}

export interface PlayerHeroCard extends PlayerCard {
  name: PlayerHeroCardName;
  hero: Hero;
}

export interface PlayerHogwartsCard extends PlayerCard {
  name: PlayerHogwartsCardName;
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
    description:
      'Gain 1 influence token. For each Ally played this turn, gain 1 attack token.',
    type: PlayerCardType.ITEM,
    hero: Hero.RON,
  },
  {
    name: PlayerHeroCardName.CLEANSWEEP_11,
    description:
      'Gain 1 attack token. If you defeat a Villain, also gain 1 influence token.',
    type: PlayerCardType.ITEM,
    hero: Hero.RON,
  },
  {
    name: PlayerHeroCardName.CROOCKSHANKS,
    description: 'Choose one: Gain 1 attack token; or gain 2 hearts.',
    type: PlayerCardType.ALLY,
    hero: Hero.HERMIONE,
  },
  {
    name: PlayerHeroCardName.FIREBOLT,
    description:
      'Gain 1 attack token. If you defeat a Villain, also gain 1 influence token.',
    type: PlayerCardType.ITEM,
    hero: Hero.HARRY,
  },
  {
    name: PlayerHeroCardName.HEDWIG,
    description: 'Choose one: Gain 1 attack token; or gain 2 hearts.',
    type: PlayerCardType.ALLY,
    hero: Hero.HARRY,
  },
  {
    name: PlayerHeroCardName.INVISIBILITY_CLOAK,
    description:
      "Gain 1 influence token. If this is in your hand, you can't lose more than 1 heart from each Dark Arts event or Villain.",
    type: PlayerCardType.ITEM,
    hero: Hero.HARRY,
  },
  {
    name: PlayerHeroCardName.MANDRAKE,
    description:
      'Choose one: Gain 1 attack token; or any one Hero gains 2 hearts.',
    type: PlayerCardType.ALLY,
    hero: Hero.NEVILLE,
  },
  {
    name: PlayerHeroCardName.PIGWIDGEON,
    description: 'Choose one: Gain 1 attack token; or gain 2 hearts.',
    type: PlayerCardType.ALLY,
    hero: Hero.RON,
  },
  {
    name: PlayerHeroCardName.REMEMBRALL,
    description:
      'Gain 1 influence token. If you discard this, gain 2 influence tokens.',
    type: PlayerCardType.ITEM,
    hero: Hero.NEVILLE,
  },
  {
    name: PlayerHeroCardName.TALES_OF_BEEDLE_THE_BARD,
    description:
      'Choose one: Gain 2 influence tokens; or ALL Heroes gain 1 influence token.',
    type: PlayerCardType.ITEM,
    hero: Hero.HERMIONE,
  },
  {
    name: PlayerHeroCardName.TIME_TURNER,
    description:
      'Gain 1 influence token. You may put Spells you acquire on top of your deck instead of in your discard pile.',
    type: PlayerCardType.ITEM,
    hero: Hero.HERMIONE,
  },
  {
    name: PlayerHeroCardName.TREVOR,
    description: 'Choose one: Gain 1 attack token; or gain 2 hearts.',
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
    description: 'Gain 2 attack tokens.',
    type: PlayerCardType.SPELL,
    cost: 5,
  },
  {
    name: PlayerHogwartsCardName.ESSENCE_OF_DITTANY,
    description: 'Any one Hero gains 2 hearts.',
    type: PlayerCardType.ITEM,
    cost: 2,
  },
  {
    name: PlayerHogwartsCardName.GOLDEN_SNITCH,
    description: 'Gain 2 influence tokens. Draw a card.',
    type: PlayerCardType.ITEM,
    cost: 5,
  },
  {
    name: PlayerHogwartsCardName.INCENDIO,
    description: 'Gain 1 attack token. Draw a card.',
    type: PlayerCardType.SPELL,
    cost: 4,
  },
  {
    name: PlayerHogwartsCardName.LUMOS,
    description: 'ALL Heroes draw a card.',
    type: PlayerCardType.SPELL,
    cost: 4,
  },
  {
    name: PlayerHogwartsCardName.OLIVER_WOOD,
    description:
      'Gain 1 attack token. If you defeat a Villain, any one Hero gains 2 hearts.',
    type: PlayerCardType.ALLY,
    cost: 3,
  },
  {
    name: PlayerHogwartsCardName.QUIDDITCH_GEAR,
    description: 'Gain 1 attack token and 1 heart.',
    type: PlayerCardType.ITEM,
    cost: 3,
  },
  {
    name: PlayerHogwartsCardName.REPARO,
    description: 'Choose one: Gain 2 influence tokens; or draw a card.',
    type: PlayerCardType.SPELL,
    cost: 3,
  },
  {
    name: PlayerHogwartsCardName.RUBEUS_HAGRID,
    description: 'Gain 1 attack token. ALL Heroes gain 1 heart.',
    type: PlayerCardType.ALLY,
    cost: 4,
  },
  {
    name: PlayerHogwartsCardName.SORTING_HAT,
    description:
      'Gain 2 influence tokens. You may put Allies you acquire on top of your deck instead of in your discard pile.',
    type: PlayerCardType.ITEM,
    cost: 4,
  },
  {
    name: PlayerHogwartsCardName.WINGARDIUM_LEVIOSA,
    description:
      'Gain 1 influence token. You may put Items you acquire on top of your deck instead of in your discard pile.',
    type: PlayerCardType.SPELL,
    cost: 2,
  },
];
