import {PlayerView} from './player_view';
import {Stack} from './stack';

export interface VillainsEvents {
  killVillain: (args: {}, callback: (playerView: PlayerView) => void) => void;
}

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
