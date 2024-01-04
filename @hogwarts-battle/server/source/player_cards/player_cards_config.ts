import {
  PlayerHeroCardName,
  PlayerHogwartsCardName,
  PlayerID,
} from '@hogwarts-battle/common';
import {GameState} from '../game_state';
import {getInternalPlayer} from '../player/players_internal_state';
import {
  AddAttackTokenMutation,
  AddHeartMutation,
  AddInfluenceTokenMutation,
  DrawCardMutation,
} from '../state_mutations/state_mutation_manager';

interface PlayerCardEffect {
  (gameState: GameState, playerID: PlayerID): GameState;
}

interface PlayerHeroCardConfig {
  effect: PlayerCardEffect;
}
interface PlayerHogwartsCardConfig {
  amount: number;
  effect: PlayerCardEffect;
}

export function getPlayerCardEffect(
  cardName: PlayerHeroCardName | PlayerHogwartsCardName
): PlayerCardEffect {
  if (PLAYER_HERO_CARD_NAMES_VALUES_AS_STRING.includes(cardName as string)) {
    return PLAYER_HERO_CARDS_CONFIG[cardName as PlayerHeroCardName].effect;
  } else if (
    PLAYER_HOGWARTS_CARD_NAMES_VALUES_AS_STRING.includes(cardName as string)
  ) {
    return PLAYER_HOGWARTS_CARDS_CONFIG[cardName as PlayerHogwartsCardName]
      .effect;
  } else {
    throw new Error('Card name not found');
  }
}

export function getPlayerHogwartsCardAmount(
  cardName: PlayerHogwartsCardName
): number {
  return PLAYER_HOGWARTS_CARDS_CONFIG[cardName].amount;
}

const PLAYER_HERO_CARDS_CONFIG: Record<
  PlayerHeroCardName,
  PlayerHeroCardConfig
> = {
  [PlayerHeroCardName.ALOHOHOMORA]: {
    effect: (gameState: GameState, playerID: PlayerID) => {
      return AddInfluenceTokenMutation.get().execute(gameState, {
        playerID,
        amount: 1,
      });
    },
  },
  [PlayerHeroCardName.BERTIE_BOTTS_EVERY_FLAVOUR_BEANS]: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHeroCardName.CLEANSWEEP_11]: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHeroCardName.CROOCKSHANKS]: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHeroCardName.FIREBOLT]: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHeroCardName.HEDWIG]: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHeroCardName.INVISIBILITY_CLOAK]: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHeroCardName.MANDRAKE]: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHeroCardName.PIGWIDGEON]: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHeroCardName.REMEMBRALL]: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHeroCardName.TALES_OF_BEEDLE_THE_BARD]: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHeroCardName.TIME_TURNER]: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHeroCardName.TREVOR]: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PLAYER_HOGWARTS_CARDS_CONFIG: Record<
  PlayerHogwartsCardName,
  PlayerHogwartsCardConfig
> = {
  [PlayerHogwartsCardName.ALBUS_DUMBLEDORE]: {
    amount: 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      const playerState = getInternalPlayer(gameState.players, playerID);
      if (!playerState) {
        throw new Error('Player not found');
      }

      gameState.players.forEach(player => {
        gameState = DrawCardMutation.get().execute(gameState, {
          playerID: player.playerID,
          amount: 1,
        });
      });
      gameState = AddHeartMutation.get().execute(gameState, {
        playerID,
        amount: 1,
      });
      gameState = AddInfluenceTokenMutation.get().execute(gameState, {
        playerID,
        amount: 1,
      });
      gameState = AddAttackTokenMutation.get().execute(gameState, {
        playerID,
        amount: 1,
      });

      return gameState;
    },
  },
  [PlayerHogwartsCardName.DESCENDO]: {
    amount: 2,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHogwartsCardName.ESSENCE_OF_DITTANY]: {
    amount: 4,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHogwartsCardName.GOLDEN_SNITCH]: {
    amount: 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHogwartsCardName.INCENDIO]: {
    amount: 4,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHogwartsCardName.LUMOS]: {
    amount: 2,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHogwartsCardName.OLIVER_WOOD]: {
    amount: 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHogwartsCardName.QUIDDITCH_GEAR]: {
    amount: 4,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHogwartsCardName.REPARO]: {
    amount: 6,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHogwartsCardName.RUBEUS_HAGRID]: {
    amount: 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHogwartsCardName.SORTING_HAT]: {
    amount: 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHogwartsCardName.WINGARDIUM_LEVIOSA]: {
    amount: 3,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effect: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
};

const PLAYER_HOGWARTS_CARD_NAMES_VALUES_AS_STRING: string[] = Object.values(
  PlayerHogwartsCardName
);
const PLAYER_HERO_CARD_NAMES_VALUES_AS_STRING: string[] =
  Object.values(PlayerHeroCardName);
