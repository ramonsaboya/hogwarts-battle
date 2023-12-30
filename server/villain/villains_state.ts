import {Stack} from '../../common/stack';

export interface Villain {
  name: string;
  health: number;
}

export interface VillainsState {
  deck: Stack<Villain>;
  active: Villain;
}

const DRACO_MALFOY: Villain = {
  name: 'Draco Malfoy',
  health: 5,
};
const LUCIUS_MALFOY: Villain = {
  name: 'Lucius Malfoy',
  health: 10,
};

export const getInitialVillainsState = (): VillainsState => ({
  deck: new Stack([LUCIUS_MALFOY]),
  active: DRACO_MALFOY,
});
