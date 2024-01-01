import {GameLocation} from '@hogwarts-battle/common';

export const LOCATIONS_PER_LEVEL: {
  [level: number]: GameLocation[];
} = {
  1: [
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
  ],
};
