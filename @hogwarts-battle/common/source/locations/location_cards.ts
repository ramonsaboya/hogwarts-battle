export interface LocationCard {
  name: string;
  order: number;
  darkArtsEventsPerTurn: number;
  requiredVillainControl: number;
}

export enum LocationName {
  DIAGON_ALLEY = 'Diagon Alley',
  MIRROR_OF_ERISED = 'Mirror of Erised',
}

export const LOCATION_CARDS: LocationCard[] = [
  {
    name: 'Diagon Alley',
    order: 1,
    darkArtsEventsPerTurn: 1,
    requiredVillainControl: 4,
  },
  {
    name: 'Mirror of Erised',
    order: 2,
    darkArtsEventsPerTurn: 1,
    requiredVillainControl: 4,
  },
];
