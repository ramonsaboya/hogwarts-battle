import {
  ChooseCardPlayerInput,
  ChooseHeroHealPlayerInput,
  PlayerCardInstance,
  PlayerHogwartsCard,
  PlayerID,
  PlayerInputType,
  Stack,
  TurnPhase,
  shuffle,
} from '@hogwarts-battle/common';
import {GameState} from '../game_state';
import {InternalPlayer} from '../player/players_internal_state';
import {onCardDiscard} from '../player_cards/player_cards_config';

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

  remove(name: string): void {
    this.middlewares.delete(name);
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

export interface DiscardCardMutationInput extends StateMutationInput {
  playerID: PlayerID;
  cardInstance: PlayerCardInstance;
}
export class DiscardCardMutation extends StateMutation<DiscardCardMutationInput> {
  private static instance: DiscardCardMutation;
  static get(): DiscardCardMutation {
    if (!DiscardCardMutation.instance) {
      DiscardCardMutation.instance = new DiscardCardMutation();
    }
    return DiscardCardMutation.instance;
  }

  protected finalMiddleware(
    gameState: GameState,
    input: DiscardCardMutationInput
  ): GameState {
    const {playerID, cardInstance} = input;

    gameState = onCardDiscard(cardInstance.card.name)(gameState, playerID);

    return {
      ...gameState,
      players: gameState.players.map(player => {
        if (player.playerID === playerID) {
          return {
            ...player,
            hand: player.hand.filter(card => card.id !== cardInstance.id),
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

export interface AddHeartMutationInput extends StateMutationInput {
  playerID: PlayerID;
  amount: number;
}
export class AddHeartMutation extends StateMutation<AddHeartMutationInput> {
  private static instance: AddHeartMutation;
  static get(): AddHeartMutation {
    if (!AddHeartMutation.instance) {
      AddHeartMutation.instance = new AddHeartMutation();
    }
    return AddHeartMutation.instance;
  }

  protected finalMiddleware(
    gameState: GameState,
    input: AddHeartMutationInput
  ): GameState {
    const {playerID, amount} = input;

    return {
      ...gameState,
      players: gameState.players.map(player => {
        if (player.playerID === playerID) {
          return {
            ...player,
            health: Math.min(10, player.health + amount),
          };
        }
        return player;
      }),
    };
  }
}

export interface SubtractHeartMutationInput extends StateMutationInput {
  playerID: PlayerID;
  amount: number;
}
export class SubtractHeartMutation extends StateMutation<SubtractHeartMutationInput> {
  private static instance: SubtractHeartMutation;
  static get(): SubtractHeartMutation {
    if (!SubtractHeartMutation.instance) {
      SubtractHeartMutation.instance = new SubtractHeartMutation();
    }
    return SubtractHeartMutation.instance;
  }

  protected finalMiddleware(
    gameState: GameState,
    input: SubtractHeartMutationInput
  ): GameState {
    const {playerID, amount} = input;

    return {
      ...gameState,
      players: gameState.players.map(player => {
        if (player.playerID === playerID) {
          return {
            ...player,
            health: Math.max(0, player.health - amount),
          };
        }
        return player;
      }),
    };
  }
}

export interface AddInfluenceTokenMutationInput extends StateMutationInput {
  playerID: PlayerID;
  amount: number;
}
export class AddInfluenceTokenMutation extends StateMutation<AddInfluenceTokenMutationInput> {
  private static instance: AddInfluenceTokenMutation;
  static get(): AddInfluenceTokenMutation {
    if (!AddInfluenceTokenMutation.instance) {
      AddInfluenceTokenMutation.instance = new AddInfluenceTokenMutation();
    }
    return AddInfluenceTokenMutation.instance;
  }

  protected finalMiddleware(
    gameState: GameState,
    input: AddInfluenceTokenMutationInput
  ): GameState {
    const {playerID, amount} = input;

    return {
      ...gameState,
      players: gameState.players.map(player => {
        if (player.playerID === playerID) {
          return {
            ...player,
            influenceTokens: player.influenceTokens + amount,
          };
        }
        return player;
      }),
    };
  }
}

export interface AddAttackTokenMutationInput extends StateMutationInput {
  playerID: PlayerID;
  amount: number;
}
export class AddAttackTokenMutation extends StateMutation<AddAttackTokenMutationInput> {
  private static instance: AddAttackTokenMutation;
  static get(): AddAttackTokenMutation {
    if (!AddAttackTokenMutation.instance) {
      AddAttackTokenMutation.instance = new AddAttackTokenMutation();
    }
    return AddAttackTokenMutation.instance;
  }

  protected finalMiddleware(
    gameState: GameState,
    input: AddAttackTokenMutationInput
  ): GameState {
    const {playerID, amount} = input;

    return {
      ...gameState,
      players: gameState.players.map(player => {
        if (player.playerID === playerID) {
          return {
            ...player,
            attackTokens: player.attackTokens + amount,
          };
        }
        return player;
      }),
    };
  }
}

export interface RequireChooseCardPlayerInputMutationInput
  extends StateMutationInput {
  playerID: PlayerID;
  playerInput: ChooseCardPlayerInput;
}
export class RequireChooseCardPlayerInputMutation extends StateMutation<RequireChooseCardPlayerInputMutationInput> {
  private static instance: RequireChooseCardPlayerInputMutation;
  static get(): RequireChooseCardPlayerInputMutation {
    if (!RequireChooseCardPlayerInputMutation.instance) {
      RequireChooseCardPlayerInputMutation.instance =
        new RequireChooseCardPlayerInputMutation();
    }
    return RequireChooseCardPlayerInputMutation.instance;
  }

  protected finalMiddleware(
    gameState: GameState,
    input: RequireChooseCardPlayerInputMutationInput
  ): GameState {
    const {playerID, playerInput} = input;

    return {
      ...gameState,
      players: gameState.players.map(player => {
        if (player.playerID === playerID) {
          return {
            ...player,
            requiredPlayerInput: playerInput,
          };
        }
        return player;
      }),
    };
  }
}

export interface ChooseCardEffectPlayerInputCallback {
  (gameState: GameState, playerID: PlayerID): GameState;
}
interface ChooseCardEffectPlayerInputOption {
  text: string;
  effect: ChooseCardEffectPlayerInputCallback;
}
export interface RequireChooseEffectPlayerInputMutationInput
  extends StateMutationInput {
  playerID: PlayerID;
  options: ChooseCardEffectPlayerInputOption[];
}
export class RequireChooseEffectPlayerInputMutation extends StateMutation<RequireChooseEffectPlayerInputMutationInput> {
  private static instance: RequireChooseEffectPlayerInputMutation;
  static get(): RequireChooseEffectPlayerInputMutation {
    if (!RequireChooseEffectPlayerInputMutation.instance) {
      RequireChooseEffectPlayerInputMutation.instance =
        new RequireChooseEffectPlayerInputMutation();
    }
    return RequireChooseEffectPlayerInputMutation.instance;
  }

  protected finalMiddleware(
    gameState: GameState,
    input: RequireChooseEffectPlayerInputMutationInput
  ): GameState {
    const {playerID, options} = input;

    return {
      ...gameState,
      players: gameState.players.map(player => {
        if (player.playerID === playerID) {
          return {
            ...player,
            requiredPlayerInput: {
              type: PlayerInputType.CHOOSE_PLAYER_CARD_EFFECT,
              options: options.map(option => option.text),
            },
            playerInputCallbacks: options.map(option => option.effect),
          };
        }
        return player;
      }),
    };
  }
}

export interface RequireChooseHeroHealPlayerInputMutationInput
  extends StateMutationInput {
  playerID: PlayerID;
  playerInput: ChooseHeroHealPlayerInput;
}
export class RequireChooseHeroHealPlayerInputMutation extends StateMutation<RequireChooseHeroHealPlayerInputMutationInput> {
  private static instance: RequireChooseHeroHealPlayerInputMutation;
  static get(): RequireChooseHeroHealPlayerInputMutation {
    if (!RequireChooseHeroHealPlayerInputMutation.instance) {
      RequireChooseHeroHealPlayerInputMutation.instance =
        new RequireChooseHeroHealPlayerInputMutation();
    }
    return RequireChooseHeroHealPlayerInputMutation.instance;
  }

  protected finalMiddleware(
    gameState: GameState,
    input: RequireChooseHeroHealPlayerInputMutationInput
  ): GameState {
    const {playerID, playerInput} = input;

    return {
      ...gameState,
      players: gameState.players.map(player => {
        if (player.playerID === playerID) {
          return {
            ...player,
            requiredPlayerInput: playerInput,
          };
        }
        return player;
      }),
    };
  }
}

export interface AddVillainControlTokenMutationInput
  extends StateMutationInput {
  playerID: PlayerID;
  amount: number;
}
export class AddVillainControlTokenMutation extends StateMutation<AddVillainControlTokenMutationInput> {
  private static instance: AddVillainControlTokenMutation;
  static get(): AddVillainControlTokenMutation {
    if (!AddVillainControlTokenMutation.instance) {
      AddVillainControlTokenMutation.instance =
        new AddVillainControlTokenMutation();
    }
    return AddVillainControlTokenMutation.instance;
  }

  protected finalMiddleware(
    gameState: GameState,
    input: AddVillainControlTokenMutationInput
  ): GameState {
    const {amount} = input;

    return {
      ...gameState,
      locations: {
        ...gameState.locations,
        villainControlTokens: gameState.locations.villainControlTokens + amount,
      },
    };
  }
}

export interface SubtractVillainControlTokenMutationInput
  extends StateMutationInput {
  playerID: PlayerID;
  amount: number;
}
export class SubtractVillainControlTokenMutation extends StateMutation<SubtractVillainControlTokenMutationInput> {
  private static instance: SubtractVillainControlTokenMutation;
  static get(): SubtractVillainControlTokenMutation {
    if (!SubtractVillainControlTokenMutation.instance) {
      SubtractVillainControlTokenMutation.instance =
        new SubtractVillainControlTokenMutation();
    }
    return SubtractVillainControlTokenMutation.instance;
  }

  protected finalMiddleware(
    gameState: GameState,
    input: SubtractVillainControlTokenMutationInput
  ): GameState {
    const {amount} = input;

    return {
      ...gameState,
      locations: {
        ...gameState.locations,
        villainControlTokens: gameState.locations.villainControlTokens - amount,
      },
    };
  }
}

export interface ChangeTurnPhaseMutationInput extends StateMutationInput {
  turnPhase: TurnPhase;
}
export class ChangeTurnPhaseMutation extends StateMutation<ChangeTurnPhaseMutationInput> {
  private static instance: ChangeTurnPhaseMutation;
  static get(): ChangeTurnPhaseMutation {
    if (!ChangeTurnPhaseMutation.instance) {
      ChangeTurnPhaseMutation.instance = new ChangeTurnPhaseMutation();
    }
    return ChangeTurnPhaseMutation.instance;
  }

  protected finalMiddleware(
    gameState: GameState,
    input: ChangeTurnPhaseMutationInput
  ): GameState {
    const {turnPhase} = input;

    return {
      ...gameState,
      turnPhase: turnPhase,
    };
  }
}
