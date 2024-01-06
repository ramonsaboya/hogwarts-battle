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
    description: 'Active Hero loses 2 hearts.',
  },
  {
    name: DarkArtsEventCardName.FLIPENDO,
    description: 'Active Hero loses 1 heart and discards a card.',
  },
  {
    name: DarkArtsEventCardName.HE_WHO_MUST_NOT_BE_NAMED,
    description: 'Add 1 villain control token to the Location.',
  },
  {
    name: DarkArtsEventCardName.PETRIFICATION,
    description:
      'ALL Heroes lose 1 heart and cannot draw extra cards this turn.',
  },
];
