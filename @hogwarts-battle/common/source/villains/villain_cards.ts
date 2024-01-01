export interface Villain {
  name: string;
  health: number;
}

export enum VillainName {
  DRACO_MALFOY = 'Draco Malfoy',
  QUIRINUS_QUIRRELL = 'Quirinus Quirrell',
  CRABBE_AND_GOYLE = 'Crabbe & Goyle',
}

export const VILLAIN_CARDS: Villain[] = [
  {
    name: 'Draco Malfoy',
    health: 6,
  },
  {
    name: 'Quirinus Quirrell',
    health: 6,
  },
  {
    name: 'Crabbe & Goyle',
    health: 5,
  },
];
