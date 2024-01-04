import {GameState} from '../game_state';
import {getInternalPlayer} from '../player/players_internal_state';
import {
  DarkArtsEventCardName,
  PlayerID,
  PlayerInputType,
} from '@hogwarts-battle/common';
import {
  DrawCardMutation,
  DrawCardMutationInput,
} from '../state_mutations/state_mutation_manager';

interface DarkArtsEventCardConfig {
  amount: number;
  cleanup: DarkArtsEventCardCleanup;
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
): DarkArtsEventCardCleanup => DARK_ARTS_EVENT_CARDS_CONFIG[cardName].cleanup;

const DARK_ARTS_EVENT_CARDS_CONFIG: Record<
  DarkArtsEventCardName,
  DarkArtsEventCardConfig
> = {
  [DarkArtsEventCardName.EXPULSO]: {
    amount: 3,
    cleanup: () => {},
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
    cleanup: () => {},
    effect: (gameState: GameState, playerID: PlayerID) => {
      return {
        ...gameState,
        players: gameState.players.map(player => {
          if (player.playerID === playerID) {
            return {
              ...player,
              requiredPlayerInput: {type: PlayerInputType.CHOOSE_DISCARD_CARD},
              health: player.health - 1,
            };
          }
          return player;
        }),
      };
    },
  },
  [DarkArtsEventCardName.HE_WHO_MUST_NOT_BE_NAMED]: {
    amount: 2,
    cleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
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
