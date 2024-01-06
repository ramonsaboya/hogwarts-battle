import {Socket} from 'socket.io';
import {GameState, createPlayerView, getInitialGameState} from './game_state';
import {HERO_TURN_ORDER} from './game_context';
import {GameContext, Hero, PlayerID, TurnPhase} from '@hogwarts-battle/common';
import {
  getInitialPlayerState,
  getInternalPlayer,
} from './player/players_internal_state';
import {getDarkArtsEventCardCleanup} from './dark_arts_events/dark_arts_event_cards_config';
import {onVillainReveal, onVillainTurn} from './villain/villain_cards_config';
import {
  ChangeTurnPhaseMutation,
  ChangeTurnPhaseMutationInput,
  DiscardCardMutation,
  DrawCardMutation,
  MiddlewareNext,
} from './state_mutations/state_mutation_manager';
import {onCardCleanup, onCardDraw} from './player_cards/player_cards_config';

type UnableToJoinReason = 'GAME_FULL' | 'NAME_TAKEN';

const MAX_PLAYERS = 4;

export class Game {
  private gameContext: GameContext;
  gameState: GameState;

  private playerSocketMap: Map<PlayerID, Socket>;

  private static nextPlayerID = 1;

  constructor() {
    this.gameContext = {} as GameContext;
    this.gameState = getInitialGameState();

    this.playerSocketMap = new Map();
  }

  get getGameContext(): GameContext {
    return this.gameContext;
  }

  getPlayerSocket(playerID: PlayerID): Socket {
    const socket = this.playerSocketMap.get(playerID);
    if (!socket) {
      throw new Error('Socket not found for player');
    }
    return socket;
  }

  addPlayer(playerName: string, hero: Hero, socket: Socket): PlayerID {
    // if (this.isGameFull()) {
    //   throw new Error('Game is full');
    // }

    // if (this.isPlayerNameTaken(playerName)) {
    //   throw new Error('Player name is taken');
    // }

    if (
      this.gameState.players.some(player => player.playerName === playerName)
    ) {
      return this.gameState.players.find(
        player => player.playerName === playerName
      )!.playerID;
    }

    const playerID = Game.nextPlayerID++;
    this.playerSocketMap.set(playerID, socket);

    this.gameState = {
      ...this.gameState,
      players: [
        ...this.gameState.players,
        getInitialPlayerState(playerID, playerName, hero),
      ],
    };

    return playerID;
  }

  canPlayerJoin(): [boolean, UnableToJoinReason | null] {
    // if (this.isGameFull()) {
    //   return [false, 'GAME_FULL'];
    // }

    // if (this.isPlayerNameTaken(playerName)) {
    //   return [false, 'NAME_TAKEN'];
    // }

    return [true, null];
  }

  private isPlayerNameTaken(playerName: string) {
    return this.gameState.players.some(
      player => player.playerName === playerName
    );
  }

  private isGameFull() {
    return this.gameState.players.length >= MAX_PLAYERS;
  }

  broadcastPlayerViews(expectPlayerID: number) {
    this.gameState.players
      .filter(player => player.playerID !== expectPlayerID)
      .forEach(player => {
        const playerView = createPlayerView(this, player.playerID);
        this.getPlayerSocket(player.playerID).emit('sync', playerView);
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

    this.gameState = onVillainReveal(
      this.gameState.villains.activeVillain!.name
    )(this.gameState, this.gameContext.currentPlayer);

    this.gameState.players.forEach(player => {
      player.hand.forEach(cardInstance => {
        onCardDraw(cardInstance.card.name)(player.playerID);
      });
    });

    ChangeTurnPhaseMutation.get().use(
      'GAME',
      (
        gameState: GameState,
        input: ChangeTurnPhaseMutationInput,
        next: MiddlewareNext<ChangeTurnPhaseMutationInput>
      ) => {
        const {turnPhase} = input;

        if (turnPhase === TurnPhase.VILLAIN_EFFECTS) {
          gameState = onVillainTurn(gameState.villains.activeVillain!.name)(
            gameState,
            this.gameContext.currentPlayer
          );

          return next(gameState, {turnPhase: TurnPhase.PLAYER_ACTIONS});
        }

        return next(gameState, input);
      }
    );
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

    this.gameState = maybeReplaceLocation(this.gameState);

    const darkArtsEvent = this.gameState.darkArtsEvents.active!;
    getDarkArtsEventCardCleanup(darkArtsEvent.name)();

    const activeVillain = this.gameState.villains.activeVillain;
    if (activeVillain === null) {
      const newVillain = this.gameState.villains.deck.pop()!;
      this.gameState = {
        ...this.gameState,
        villains: {
          ...this.gameState.villains,
          activeVillain: newVillain,
        },
      };

      this.gameState = onVillainReveal(newVillain.name)(
        this.gameState,
        currentPlayerID
      );
    }

    this.gameState = drawNewHand(this.gameState, currentPlayerID);

    this.gameContext = {
      ...this.gameContext,
      turn: this.gameContext.turn + 1,
      currentPlayer: nextTurnPlayer,
    };
    this.gameState = {
      ...this.gameState,
      turnPhase: TurnPhase.DARK_ARTS_EVENT_REVEAL,
      players: this.gameState.players.map(player => {
        if (player.playerID !== currentPlayerID) {
          return player;
        }

        return {
          ...player,
          attackTokens: 0,
          influenceTokens: 0,
        };
      }),
    };
  }
}

const HAND_SIZE = 5;

function drawNewHand(
  gameState: GameState,
  currentPlayerID: PlayerID
): GameState {
  gameState.players.forEach(player => {
    if (player.playerID !== currentPlayerID) {
      return;
    }

    player.cardsDuringTurnPile.forEach(cardInstance => {
      onCardCleanup(cardInstance.card.name)();
      gameState = {
        ...gameState,
        players: gameState.players.map(player => {
          if (player.playerID !== currentPlayerID) {
            return player;
          }

          return {
            ...player,
            discardPile: [...player.discardPile, cardInstance],
          };
        }),
      };
    });

    player.hand.forEach(cardInstance => {
      gameState = DiscardCardMutation.get().execute(gameState, {
        playerID: currentPlayerID,
        cardInstance,
      });
    });

    gameState = DrawCardMutation.get().execute(gameState, {
      playerID: currentPlayerID,
      amount: HAND_SIZE,
    });

    gameState = {
      ...gameState,
      players: gameState.players.map(player => {
        if (player.playerID !== currentPlayerID) {
          return player;
        }

        return {
          ...player,
          cardsDuringTurnPile: [],
        };
      }),
    };
  });
  return gameState;
}

function maybeReplaceLocation(gameState: GameState): GameState {
  const currentLocation = gameState.locations.deck.peek()!;
  const currentVillainControlTokens = gameState.locations.villainControlTokens;

  if (currentVillainControlTokens < currentLocation.requiredVillainControl) {
    return gameState;
  }

  gameState.locations.deck.pop()!;
  return {
    ...gameState,
    locations: {
      ...gameState.locations,
      villainControlTokens: 0,
    },
  };
}
