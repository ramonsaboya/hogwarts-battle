import {PlayerID} from './player_view';

export interface GameContext {
  turn: number;
  currentPlayer: PlayerID;
  playerTurnOrder: PlayerID[];
}
