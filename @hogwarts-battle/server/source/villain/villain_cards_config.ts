import {GameState} from '../game_state';
import {PlayerID, VillainCardName} from '@hogwarts-battle/common';

interface VillainCardConsequence {
  (gameState: GameState, playerID: PlayerID): GameState;
}

interface VillainCardConfig {
  effect: VillainCardConsequence;
  reward: VillainCardConsequence;
}

export const getVillainCardEffect = (
  cardName: VillainCardName
): VillainCardConsequence => VILLAIN_CARDS_CONFIG[cardName].effect;

export const getVillainCardReward = (
  cardName: VillainCardName
): VillainCardConsequence => VILLAIN_CARDS_CONFIG[cardName].reward;

const VILLAIN_CARDS_CONFIG: Record<VillainCardName, VillainCardConfig> = {
  'Crabbe & Goyle': {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reward: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  'Draco Malfoy': {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reward: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  'Quirinus Quirrell': {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reward: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
};
