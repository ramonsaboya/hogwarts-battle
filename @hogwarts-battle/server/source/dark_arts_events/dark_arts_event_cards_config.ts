import {GameState} from '../game_state';
import {
  DarkArtsEventCardName,
  PlayerID,
  getPlayerState,
} from '@hogwarts-battle/common';

interface DarkArtsEventCardEffect {
  (gameState: GameState, playerID: PlayerID): GameState;
}

interface DarkArtsEventCardConfig {
  amount: number;
  effect: DarkArtsEventCardEffect;
}

export const getDarkArtsEventCardEffect = (
  cardName: DarkArtsEventCardName
): DarkArtsEventCardEffect => DARK_ARTS_EVENT_CARDS_CONFIG[cardName].effect;

export const getDarkArtsEventCardAmount = (
  cardName: DarkArtsEventCardName
): number => DARK_ARTS_EVENT_CARDS_CONFIG[cardName].amount;

const DARK_ARTS_EVENT_CARDS_CONFIG: Record<
  DarkArtsEventCardName,
  DarkArtsEventCardConfig
> = {
  Expulso: {
    amount: 2,
    effect: (gameState: GameState, playerID: PlayerID) => {
      const playerState = getPlayerState(gameState.players, playerID);
      if (!playerState) {
        throw new Error('Player not found');
      }

      const affectedPlayerState = {
        ...playerState,
        health: playerState.health - 2,
      };

      const otherPlayers = gameState.players.filter(
        player => player.playerID !== playerID
      );

      return {
        ...gameState,
        players: [...otherPlayers, affectedPlayerState],
      };
    },
  },
  Flipendo: {
    amount: 2,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  'He Who Must Not Be Named': {
    amount: 2,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  Petrification: {
    amount: 3,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
};
