import {
  PlayerHeroCardName,
  PlayerHogwartsCardName,
  PlayerID,
} from '@hogwarts-battle/common';
import {GameState} from '../game_state';
import {getInternalPlayer} from './players_internal_state';

interface PlayerCardEffect {
  (gameState: GameState, playerID: PlayerID): GameState;
}

interface PlayerCardConfig {
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

const PLAYER_HERO_CARDS_CONFIG: Record<PlayerHeroCardName, PlayerCardConfig> = {
  [PlayerHeroCardName.ALOHOHOMORA]: {
    effect: (gameState: GameState, playerID: PlayerID) => {
      const playerState = getInternalPlayer(gameState.players, playerID);
      if (!playerState) {
        throw new Error('Player not found');
      }

      const affectedPlayerState = {
        ...playerState,
        influenceTokens: playerState.influenceTokens + 1,
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
  PlayerCardConfig
> = {};

const PLAYER_HOGWARTS_CARD_NAMES_VALUES_AS_STRING: string[] = Object.values(
  PlayerHogwartsCardName
);
const PLAYER_HERO_CARD_NAMES_VALUES_AS_STRING: string[] =
  Object.values(PlayerHeroCardName);
