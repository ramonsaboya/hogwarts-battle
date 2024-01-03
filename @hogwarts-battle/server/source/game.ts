import {Socket} from 'socket.io';
import {GameState, createPlayerView, getInitialGameState} from './game_state';
import {HERO_TURN_ORDER} from './game_context';
import {
  GameContext,
  Hero,
  PlayerID,
  Stack,
  shuffle,
} from '@hogwarts-battle/common';
import {
  InternalPlayer,
  getInitialPlayerState,
  getInternalPlayer,
} from './player/players_internal_state';
import {getDarkArtsEventCardCleanup} from './dark_arts_events/dark_arts_event_cards_config';

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
        getInitialPlayerState(player.id, hero),
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
    const currentPlayerID = this.gameContext.currentPlayer;
    const nextTurnPlayer =
      this.gameContext.playerTurnOrder[
        (this.gameContext.playerTurnOrder.indexOf(
          this.gameContext.currentPlayer
        ) +
          1) %
          this.gameContext.playerTurnOrder.length
      ];

    const currentPlayerState = getInternalPlayer(
      this.gameState.players,
      currentPlayerID
    );
    if (!currentPlayerState) {
      throw new Error('Player not found');
    }
    const otherPlayers = this.gameState.players.filter(
      player => player.playerID !== currentPlayerID
    );
    const darkArtsEvent = this.gameState.darkArtsEvents.active!;
    getDarkArtsEventCardCleanup(darkArtsEvent.name)();

    this.gameContext = {
      ...this.gameContext,
      turn: this.gameContext.turn + 1,
      currentPlayer: nextTurnPlayer,
    };
    this.gameState = {
      ...this.gameState,
      players: [
        ...otherPlayers,
        {
          ...currentPlayerState,
          ...drawNewHand(currentPlayerState),
          influenceTokens: 0,
          attackTokens: 0,
        },
      ],
    };
  }
}

const HAND_SIZE = 5;

function drawNewHand(player: InternalPlayer): InternalPlayer {
  const currentHand = player.hand;
  const newDiscardPile = [...player.discardPile, ...currentHand];

  const deckSize = player.deck.length();
  if (deckSize >= HAND_SIZE) {
    return {
      ...player,
      hand: player.deck.draw(HAND_SIZE),
      discardPile: newDiscardPile,
    };
  }

  const firstDrawnCards = player.deck.draw(deckSize);
  const newDeck = new Stack(shuffle(newDiscardPile));
  const secondDrawnCards = newDeck.draw(HAND_SIZE - firstDrawnCards.length);
  return {
    ...player,
    hand: [...firstDrawnCards, ...secondDrawnCards],
    deck: newDeck,
    discardPile: [],
  };
}
