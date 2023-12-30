import {Stack} from '../common/stack';
import {Card, GameState, getInitialGameState} from './game_state';

export type PlayerID = number;

export interface Player {
  id: PlayerID;
  name: string;
}

export type UnableToJoinReason = 'GAME_FULL' | 'NAME_TAKEN';

const MAX_PLAYERS = 4;

export class Game {
  private state: GameState;
  private players: Player[];

  static nextPlayerID = 1;

  constructor() {
    this.state = getInitialGameState();
    this.players = [];
  }

  public getState(): GameState {
    return this.state;
  }

  public setState(state: GameState) {
    this.state = state;
  }

  public getPlayers(): Player[] {
    return this.players;
  }

  public addPlayer(playerName: string): Player {
    if (this.isGameFull()) {
      throw new Error('Game is full');
    }

    if (this.isPlayerNameTaken(playerName)) {
      throw new Error('Player name is taken');
    }

    const player: Player = {
      id: Game.nextPlayerID++,
      name: playerName,
    };
    this.players.push(player);

    this.state = {
      ...this.state,
      players: {
        ...this.state.players,
        [player.id]: {
          hand: [],
          deck: new Stack<Card>(),
          discardPile: [],
        },
      },
    };

    return player;
  }

  public canPlayerJoin(
    playerName: string
  ): [boolean, UnableToJoinReason | null] {
    if (this.isGameFull()) {
      return [false, 'GAME_FULL'];
    }

    if (this.isPlayerNameTaken(playerName)) {
      return [false, 'NAME_TAKEN'];
    }

    return [true, null];
  }

  private isPlayerNameTaken(playerName: string) {
    return this.players.some(player => player.name === playerName);
  }

  private isGameFull() {
    return this.players.length >= MAX_PLAYERS;
  }
}
