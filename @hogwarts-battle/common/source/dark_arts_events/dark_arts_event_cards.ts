export interface DarkArtsEventCard {
  name: DarkArtsEventCardName;
  description: string;
}

export enum DarkArtsEventCardName {
  EXPULSO = 'Expulso',
  FLIPENDO = 'Flipendo',
  HE_WHO_MUST_NOT_BE_NAMED = 'He Who Must Not Be Named',
  PETRIFICATION = 'Petrification',
}

export const DARK_ARTS_EVENT_CARDS: DarkArtsEventCard[] = [
  {
    name: DarkArtsEventCardName.EXPULSO,
    description: 'Active hero loses 1 health and discards 1 card',
  },
  {
    name: DarkArtsEventCardName.FLIPENDO,
    description: 'Active hero loses 1 health and discards 1 card',
  },
  {
    name: DarkArtsEventCardName.HE_WHO_MUST_NOT_BE_NAMED,
    description: 'Active hero loses 1 health and discards 1 card',
  },
  {
    name: DarkArtsEventCardName.PETRIFICATION,
    description: 'Active hero loses 1 health and discards 1 card',
  },
];
