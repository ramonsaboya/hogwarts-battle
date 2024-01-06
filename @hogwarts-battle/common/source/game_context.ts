import {PlayerID} from './player_view';

export enum GameResult {
  WIN = 'WIN',
  LOSS = 'LOSS',
}

export interface GameContext {
  turn: number;
  currentPlayer: PlayerID;
  playerTurnOrder: PlayerID[];
  gameResult: GameResult | null;
}
