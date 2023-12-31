import {PlayerID} from './game';
import {Hero} from './player/player_state';

export const HERO_TURN_ORDER: Hero[] = ['Hermione', 'Ron', 'Harry', 'Neville'];

export interface GameContext {
  turn: number;
  currentPlayer: PlayerID;
  playerTurnOrder: PlayerID[];
}
