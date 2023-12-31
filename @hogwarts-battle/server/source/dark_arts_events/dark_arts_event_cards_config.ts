import {GameState} from '../game_state';
import {
  DarkArtsEventCardName,
  PlayerID,
  PlayerInputType,
} from '@hogwarts-battle/common';
import {
  AddVillainControlTokenMutation,
  DrawCardMutation,
  DrawCardMutationInput,
  RequireChooseCardPlayerInputMutation,
  SubtractHeartMutation,
} from '../state_mutations/state_mutation_manager';

interface DarkArtsEventCardConfig {
  amount: number;
  cleanup?: DarkArtsEventCardCleanup;
  effect: DarkArtsEventCardEffect;
}
interface DarkArtsEventCardEffect {
  (gameState: GameState, playerID: PlayerID): GameState;
}
interface DarkArtsEventCardCleanup {
  (): void;
}

export const getDarkArtsEventCardAmount = (
  cardName: DarkArtsEventCardName
): number => DARK_ARTS_EVENT_CARDS_CONFIG[cardName].amount;

export const getDarkArtsEventCardEffect = (
  cardName: DarkArtsEventCardName
): DarkArtsEventCardEffect => DARK_ARTS_EVENT_CARDS_CONFIG[cardName].effect;

export const getDarkArtsEventCardCleanup = (
  cardName: DarkArtsEventCardName
): DarkArtsEventCardCleanup =>
  DARK_ARTS_EVENT_CARDS_CONFIG[cardName].cleanup ?? (() => {});

const DARK_ARTS_EVENT_CARDS_CONFIG: Record<
  DarkArtsEventCardName,
  DarkArtsEventCardConfig
> = {
  [DarkArtsEventCardName.EXPULSO]: {
    amount: 3,
    effect: (gameState: GameState, playerID: PlayerID) => {
      return SubtractHeartMutation.get().execute(gameState, {
        playerID,
        amount: 2,
      });
    },
  },
  [DarkArtsEventCardName.FLIPENDO]: {
    amount: 2,
    effect: (gameState: GameState, playerID: PlayerID) => {
      gameState = SubtractHeartMutation.get().execute(gameState, {
        playerID,
        amount: 1,
      });
      gameState = RequireChooseCardPlayerInputMutation.get().execute(
        gameState,
        {
          playerID,
          playerInput: {type: PlayerInputType.CHOOSE_DISCARD_CARD, amount: 1},
        }
      );

      return gameState;
    },
  },
  [DarkArtsEventCardName.HE_WHO_MUST_NOT_BE_NAMED]: {
    amount: 3,
    effect: (gameState: GameState, playerID: PlayerID) => {
      return AddVillainControlTokenMutation.get().execute(gameState, {
        playerID,
        amount: 1,
      });
    },
  },
  [DarkArtsEventCardName.PETRIFICATION]: {
    amount: 2,
    cleanup: () =>
      DrawCardMutation.get().remove(DarkArtsEventCardName.PETRIFICATION),
    effect: (gameState: GameState) => {
      DrawCardMutation.get().use(
        DarkArtsEventCardName.PETRIFICATION,
        (gameState: GameState, input: DrawCardMutationInput) => {
          return [gameState, input];
        }
      );

      gameState.players.forEach(player => {
        gameState = SubtractHeartMutation.get().execute(gameState, {
          playerID: player.playerID,
          amount: 1,
        });
      });

      return gameState;
    },
  },
};
