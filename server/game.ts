import {Socket} from 'socket.io';
import {Stack} from '../common/stack';
import {GameState, createPlayerView, getInitialGameState} from './game_state';
import {Card} from './player/player_state';

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
  private playerSocketMap: Map<PlayerID, Socket>;

  static nextPlayerID = 1;

  constructor() {
    this.state = getInitialGameState();
    this.players = [];
    this.playerSocketMap = new Map();
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

  public getPlayerSocket(playerID: PlayerID): Socket {
    const socket = this.playerSocketMap.get(playerID);
    if (!socket) {
      throw new Error('Socket not found for player');
    }
    return socket;
  }

  public addPlayer(playerName: string, socket: Socket): Player {
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
    this.playerSocketMap.set(player.id, socket);

    this.state = {
      ...this.state,
      players: {
        ...this.state.players,
        [player.id]: {
          hero: null,
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

  public broadcastPlayerViews(expectPlayerID: number) {
    this.getPlayers()
      .filter(player => player.id !== expectPlayerID)
      .forEach(player => {
        const playerView = createPlayerView(this.getState(), player.id);
        this.getPlayerSocket(player.id).emit('sync', playerView);
      });
  }
}
