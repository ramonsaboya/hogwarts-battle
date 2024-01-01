export interface VillainCard {
  name: VillainCardName;
  health: number;
  effectDescription: string;
  rewardDescription: string;
}

export enum VillainCardName {
  CRABBE_AND_GOYLE = 'Crabbe & Goyle',
  DRACO_MALFOY = 'Draco Malfoy',
  QUIRINUS_QUIRRELL = 'Quirinus Quirrell',
}

export const VILLAIN_CARDS: VillainCard[] = [
  {
    name: VillainCardName.CRABBE_AND_GOYLE,
    health: 5,
    effectDescription:
      'Each time a Dark Arts event or Villain causes a Hero to discard a card, that Hero loses 1 health.',
    rewardDescription: 'ALL heroes draw a card.',
  },
  {
    name: VillainCardName.DRACO_MALFOY,
    health: 6,
    effectDescription:
      'Each time villain control token is added to the Location, active Hero loses 2 health.',
    rewardDescription: 'Remove 1 villain control token from the Location.',
  },
  {
    name: VillainCardName.QUIRINUS_QUIRRELL,
    health: 6,
    effectDescription: 'Active Hero loses 1 health.',
    rewardDescription: 'ALL heroes gain 1 influence token and 1 health.',
  },
];
