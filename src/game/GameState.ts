export interface GameState {
  gameContext: {
    players: Player[];
    currentPlayer: number;
  };
  playerView: {
    activeVillains: string[];
  };
}

export interface Player {
  id: number;
  name: string;
}
