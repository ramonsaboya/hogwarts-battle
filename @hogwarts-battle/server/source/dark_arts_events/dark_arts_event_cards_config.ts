import {GameState} from '../game_state';
import {getInternalPlayer} from '../player/players_internal_state';
import {DarkArtsEventCardName, PlayerID} from '@hogwarts-battle/common';
import {
  DrawCardMutation,
  DrawCardMutationInput,
  Middleware,
  MiddlewareNext,
} from '../state_mutations/state_mutation_manager';

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
  [DarkArtsEventCardName.EXPULSO]: {
    amount: 3,
    effect: (gameState: GameState, playerID: PlayerID) => {
      const playerState = getInternalPlayer(gameState.players, playerID);
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
  [DarkArtsEventCardName.FLIPENDO]: {
    amount: 2,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [DarkArtsEventCardName.HE_WHO_MUST_NOT_BE_NAMED]: {
    amount: 2,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [DarkArtsEventCardName.PETRIFICATION]: {
    amount: 10,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      DrawCardMutation.get().use(
        'petrification',
        (gameState: GameState, input: DrawCardMutationInput) => {
          return [gameState, input];
        }
      );

      return {
        ...gameState,
        players: gameState.players.map(player => ({
          ...player,
          health: player.health - 1,
        })),
      };
    },
  },
};
