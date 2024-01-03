import {
  PlayerCardInstance,
  PlayerHogwartsCard,
  PlayerID,
  Stack,
  shuffle,
} from '@hogwarts-battle/common';
import {GameState} from '../game_state';
import {InternalPlayer} from '../player/players_internal_state';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StateMutationInput {}
export interface MiddlewareNext<T extends StateMutationInput> {
  (gameState: GameState, input: T): [GameState, T];
}
export interface Middleware<T extends StateMutationInput> {
  (gameState: GameState, input: T, next: MiddlewareNext<T>): [GameState, T];
}

abstract class StateMutation<T extends StateMutationInput> {
  protected middlewares: Map<string, Middleware<T>>;

  constructor() {
    this.middlewares = new Map();
  }

  use(name: string, fn: Middleware<T>): void {
    this.middlewares.set(name, fn);
  }

  execute(gameState: GameState, input: T): GameState {
    const middlewares = [
      ...this.middlewares.values(),
      (gameState: GameState, input: T): [GameState, T] => [
        this.finalMiddleware(gameState, input),
        input,
      ],
    ];

    const executeMiddleware = (
      index: number,
      gameState: GameState,
      input: T
    ): [GameState, T] => {
      if (index < middlewares.length) {
        const currentMiddleware = middlewares[index];
        return currentMiddleware(
          gameState,
          input,
          (gameState: GameState, input: T) =>
            executeMiddleware(index + 1, gameState, input)
        );
      }
      return [gameState, input];
    };
    [gameState] = executeMiddleware(0, gameState, input);
    return gameState;
  }

  protected abstract finalMiddleware(gameState: GameState, input: T): GameState;
}

export interface AcquireCardMutationInput extends StateMutationInput {
  playerID: PlayerID;
  cardInstance: PlayerCardInstance;
}
export class AcquireCardMutation extends StateMutation<AcquireCardMutationInput> {
  private static instance: AcquireCardMutation;
  static get(): AcquireCardMutation {
    if (!AcquireCardMutation.instance) {
      AcquireCardMutation.instance = new AcquireCardMutation();
    }
    return AcquireCardMutation.instance;
  }

  protected finalMiddleware(
    gameState: GameState,
    input: AcquireCardMutationInput
  ): GameState {
    const {playerID, cardInstance} = input;
    const card = cardInstance.card as PlayerHogwartsCard;

    const playerCards = gameState.playerCards;
    const cardIdx = playerCards.availableCards.findIndex(
      card => card.id === cardInstance.id
    );
    playerCards.availableCards[cardIdx] = playerCards.deck.pop()!;

    return {
      ...gameState,
      players: gameState.players.map(player => {
        if (player.playerID === playerID) {
          return {
            ...player,
            influenceTokens: player.influenceTokens - card.cost,
            discardPile: [...player.discardPile, cardInstance],
          };
        }
        return player;
      }),
    };
  }
}

export interface DrawCardMutationInput extends StateMutationInput {
  playerID: PlayerID;
  amount: number;
}
export class DrawCardMutation extends StateMutation<DrawCardMutationInput> {
  private static instance: DrawCardMutation;
  static get(): DrawCardMutation {
    if (!DrawCardMutation.instance) {
      DrawCardMutation.instance = new DrawCardMutation();
    }
    return DrawCardMutation.instance;
  }

  protected finalMiddleware(
    gameState: GameState,
    input: DrawCardMutationInput
  ): GameState {
    const {playerID, amount} = input;

    return {
      ...gameState,
      players: gameState.players.map(player => {
        if (player.playerID === playerID) {
          const deckSize = player.deck.length();

          let newPlayer;
          if (amount <= deckSize) {
            newPlayer = this.drawCards(player, amount);
          } else {
            newPlayer = this.drawCards(player, deckSize);
            newPlayer = this.resetDeck(newPlayer);
            newPlayer = this.drawCards(newPlayer, amount - deckSize);
          }

          return newPlayer;
        }
        return player;
      }),
    };
  }

  private drawCards(
    playerState: InternalPlayer,
    amount: number
  ): InternalPlayer {
    return {
      ...playerState,
      hand: [
        ...playerState.hand,
        ...new Array(amount).fill(null).map(() => playerState.deck.pop()!),
      ],
    };
  }

  private resetDeck(playerState: InternalPlayer): InternalPlayer {
    return {
      ...playerState,
      deck: new Stack(shuffle([...playerState.discardPile])),
      discardPile: [],
    };
  }
}
