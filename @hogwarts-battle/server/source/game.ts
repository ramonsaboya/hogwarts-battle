import {Socket} from 'socket.io';
import {GameState, createPlayerView, getInitialGameState} from './game_state';
import {HERO_TURN_ORDER} from './game_context';
import {
  PlayerCard,
  GameContext,
  Hero,
  PlayerID,
  Stack,
} from '@hogwarts-battle/common';

interface Player {
  id: PlayerID;
  name: string;
}

type UnableToJoinReason = 'GAME_FULL' | 'NAME_TAKEN';

const MAX_PLAYERS = 4;

export class Game {
  private gameContext: GameContext;
  gameState: GameState;

  private players: Player[];
  private playerSocketMap: Map<PlayerID, Socket>;

  private static nextPlayerID = 1;

  constructor() {
    this.gameContext = {} as GameContext;
    this.gameState = getInitialGameState();

    this.players = [];
    this.playerSocketMap = new Map();
  }

  get getGameContext(): GameContext {
    return this.gameContext;
  }

  get getPlayers(): Player[] {
    return this.players;
  }

  getPlayerSocket(playerID: PlayerID): Socket {
    const socket = this.playerSocketMap.get(playerID);
    if (!socket) {
      throw new Error('Socket not found for player');
    }
    return socket;
  }

  addPlayer(playerName: string, hero: Hero, socket: Socket): Player {
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

    this.gameState = {
      ...this.gameState,
      players: [
        ...this.gameState.players,
        {
          playerID: player.id,
          health: 10,
          influenceTokens: 0,
          attackTokens: 0,
          hero: hero,
          hand: [
            {name: 'test1', type: 'SPELL'},
            {name: 'test2', type: 'ITEM'},
          ],
          deck: new Stack<PlayerCard>(),
          discardPile: [],
        },
      ],
    };

    if (this.players.length === 2) {
      this.startGame();
    }

    return player;
  }

  canPlayerJoin(playerName: string): [boolean, UnableToJoinReason | null] {
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

  broadcastPlayerViews(expectPlayerID: number) {
    this.players
      .filter(player => player.id !== expectPlayerID)
      .forEach(player => {
        const playerView = createPlayerView(this, player.id);
        this.getPlayerSocket(player.id).emit('sync', playerView);
      });
  }

  startGame() {
    const playerTurnOrder = HERO_TURN_ORDER.reduce((acc, hero) => {
      const maybePlayer = this.gameState.players.find(
        player => player.hero === hero
      );
      if (maybePlayer) {
        return [...acc, maybePlayer.playerID];
      }
      return acc;
    }, [] as number[]);

    this.gameContext = {
      turn: 1,
      currentPlayer: playerTurnOrder[0],
      playerTurnOrder: playerTurnOrder,
    };
  }

  isPlayerTurn(playerID: number) {
    return this.gameContext.currentPlayer === playerID;
  }

  endTurn() {
    const nextTurnPlayer =
      this.gameContext.playerTurnOrder[
        (this.gameContext.playerTurnOrder.indexOf(
          this.gameContext.currentPlayer
        ) +
          1) %
          this.gameContext.playerTurnOrder.length
      ];

    this.gameContext = {
      ...this.gameContext,
      turn: this.gameContext.turn + 1,
      currentPlayer: nextTurnPlayer,
    };
  }
}
