import {GameState} from '../game_state';
import {PlayerID, VillainCardName} from '@hogwarts-battle/common';
import {
  AddHeartMutation,
  AddInfluenceTokenMutation,
  AddVillainControlTokenMutation,
  AddVillainControlTokenMutationInput,
  DiscardCardMutation,
  DiscardCardMutationInput,
  DrawCardMutation,
  MiddlewareNext,
  SubtractHeartMutation,
  SubtractVillainControlTokenMutation,
} from '../state_mutations/state_mutation_manager';

interface VillainCardEvent {
  (gameState: GameState, playerID: PlayerID): GameState;
}

interface VillainCardConfig {
  onReveal: VillainCardEvent;
  onTurn: VillainCardEvent;
  onDefeat: VillainCardEvent;
}

export const onVillainReveal = (cardName: VillainCardName): VillainCardEvent =>
  VILLAIN_CARDS_CONFIG[cardName].onReveal;

export const onVillainTurn = (cardName: VillainCardName): VillainCardEvent =>
  VILLAIN_CARDS_CONFIG[cardName].onTurn;

export const onVillainDefeat = (cardName: VillainCardName): VillainCardEvent =>
  VILLAIN_CARDS_CONFIG[cardName].onDefeat;

const VILLAIN_CARDS_CONFIG: Record<VillainCardName, VillainCardConfig> = {
  [VillainCardName.CRABBE_AND_GOYLE]: {
    onReveal: (gameState: GameState) => {
      DiscardCardMutation.get().use(
        VillainCardName.CRABBE_AND_GOYLE,
        (
          gameState: GameState,
          input: DiscardCardMutationInput,
          next: MiddlewareNext<DiscardCardMutationInput>
        ) => {
          gameState = SubtractHeartMutation.get().execute(gameState, {
            playerID: input.playerID,
            amount: 1,
          });
          return next(gameState, input);
        }
      );

      return gameState;
    },
    onTurn: (gameState: GameState) => {
      return gameState;
    },
    onDefeat: (gameState: GameState) => {
      DiscardCardMutation.get().remove(VillainCardName.CRABBE_AND_GOYLE);

      gameState.players.forEach(player => {
        gameState = DrawCardMutation.get().execute(gameState, {
          playerID: player.playerID,
          amount: 1,
        });
      });
      return gameState;
    },
  },
  [VillainCardName.DRACO_MALFOY]: {
    onReveal: (gameState: GameState) => {
      AddVillainControlTokenMutation.get().use(
        VillainCardName.DRACO_MALFOY,
        (
          gameState: GameState,
          input: AddVillainControlTokenMutationInput,
          next: MiddlewareNext<AddVillainControlTokenMutationInput>
        ) => {
          gameState = SubtractHeartMutation.get().execute(gameState, {
            playerID: input.playerID,
            amount: 2,
          });
          return next(gameState, input);
        }
      );

      return gameState;
    },
    onTurn: (gameState: GameState) => {
      return gameState;
    },
    onDefeat: (gameState: GameState, playerID: PlayerID) => {
      AddVillainControlTokenMutation.get().remove(VillainCardName.DRACO_MALFOY);

      gameState = SubtractVillainControlTokenMutation.get().execute(gameState, {
        playerID,
        amount: 1,
      });
      return gameState;
    },
  },
  [VillainCardName.QUIRINUS_QUIRRELL]: {
    onReveal: (gameState: GameState) => {
      return gameState;
    },
    onTurn: (gameState: GameState, playerID: PlayerID) => {
      return SubtractHeartMutation.get().execute(gameState, {
        playerID,
        amount: 1,
      });
    },
    onDefeat: (gameState: GameState) => {
      gameState.players.forEach(player => {
        gameState = AddInfluenceTokenMutation.get().execute(gameState, {
          playerID: player.playerID,
          amount: 1,
        });
        gameState = AddHeartMutation.get().execute(gameState, {
          playerID: player.playerID,
          amount: 1,
        });
      });
      return gameState;
    },
  },
};
