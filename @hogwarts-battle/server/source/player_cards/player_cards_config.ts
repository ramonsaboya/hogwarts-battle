import {GameState} from '../game_state';
import {
  AddAttackTokenMutation,
  AddHeartMutation,
  AddInfluenceTokenMutation,
  DefeatVillainMutation,
  DefeatVillainMutationInput,
  DrawCardMutation,
  MiddlewareNext,
  RequireChooseEffectPlayerInputMutation,
  RequireChooseHeroHealPlayerInputMutation,
} from '../state_mutations/state_mutation_manager';
import {
  PlayerCardName,
  PlayerHeroCardName,
  PlayerHogwartsCardName,
  PlayerID,
  PlayerInputType,
} from '@hogwarts-battle/common';

interface PlayerCardEvent {
  (gameState: GameState, playerID: PlayerID): GameState;
}

interface PlayerCardConfig {
  onPlay: PlayerCardEvent;
  onDiscard?: PlayerCardEvent;
  onCleanup?: () => void;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PlayerHeroCardConfig extends PlayerCardConfig {}
interface PlayerHogwartsCardConfig extends PlayerCardConfig {
  amount: number;
}

export function onCardPlay(cardName: PlayerCardName): PlayerCardEvent {
  return getCardConfig(cardName).onPlay;
}

export function onCardDiscard(cardName: PlayerCardName): PlayerCardEvent {
  return getCardConfig(cardName).onDiscard ?? (gameState => gameState);
}

export function onCardCleanup(cardName: PlayerCardName): () => void {
  return getCardConfig(cardName).onCleanup ?? (() => {});
}

const PLAYER_HOGWARTS_CARD_NAMES_VALUES_AS_STRING: string[] = Object.values(
  PlayerHogwartsCardName
);
const PLAYER_HERO_CARD_NAMES_VALUES_AS_STRING: string[] =
  Object.values(PlayerHeroCardName);
function getCardConfig(cardName: PlayerCardName): PlayerCardConfig {
  if (PLAYER_HERO_CARD_NAMES_VALUES_AS_STRING.includes(cardName as string)) {
    return PLAYER_HERO_CARDS_CONFIG[cardName as PlayerHeroCardName];
  } else if (
    PLAYER_HOGWARTS_CARD_NAMES_VALUES_AS_STRING.includes(cardName as string)
  ) {
    return PLAYER_HOGWARTS_CARDS_CONFIG[cardName as PlayerHogwartsCardName];
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
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      gameState = AddAttackTokenMutation.get().execute(gameState, {
        playerID,
        amount: 1,
      });
      return AddInfluenceTokenMutation.get().execute(gameState, {
        playerID,
        amount: 1,
      });
    },
  },
  [PlayerHeroCardName.BERTIE_BOTTS_EVERY_FLAVOUR_BEANS]: {
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHeroCardName.CLEANSWEEP_11]: {
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHeroCardName.CROOCKSHANKS]: {
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      return getBaseAllyHeroCardEffect()(gameState, playerID);
    },
  },
  [PlayerHeroCardName.FIREBOLT]: {
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHeroCardName.HEDWIG]: {
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      return getBaseAllyHeroCardEffect()(gameState, playerID);
    },
  },
  [PlayerHeroCardName.INVISIBILITY_CLOAK]: {
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHeroCardName.MANDRAKE]: {
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      return RequireChooseEffectPlayerInputMutation.get().execute(gameState, {
        playerID,
        options: [
          {
            text: '1 attack token',
            effect: (gameState: GameState, playerID: PlayerID) => {
              return AddAttackTokenMutation.get().execute(gameState, {
                playerID,
                amount: 1,
              });
            },
          },
          {
            text: 'any one Hero gains 2 hearts',
            effect: (gameState: GameState) => {
              return RequireChooseHeroHealPlayerInputMutation.get().execute(
                gameState,
                {
                  playerID,
                  playerInput: {
                    type: PlayerInputType.CHOOSE_ONE_HERO_FOR_HEAL,
                    amount: 2,
                  },
                }
              );
            },
          },
        ],
      });
    },
  },
  [PlayerHeroCardName.PIGWIDGEON]: {
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      return getBaseAllyHeroCardEffect()(gameState, playerID);
    },
  },
  [PlayerHeroCardName.REMEMBRALL]: {
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return AddInfluenceTokenMutation.get().execute(gameState, {
        playerID,
        amount: 2,
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      return AddInfluenceTokenMutation.get().execute(gameState, {
        playerID,
        amount: 1,
      });
    },
  },
  [PlayerHeroCardName.TALES_OF_BEEDLE_THE_BARD]: {
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHeroCardName.TIME_TURNER]: {
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHeroCardName.TREVOR]: {
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      return getBaseAllyHeroCardEffect()(gameState, playerID);
    },
  },
};

const PLAYER_HOGWARTS_CARDS_CONFIG: Record<
  PlayerHogwartsCardName,
  PlayerHogwartsCardConfig
> = {
  [PlayerHogwartsCardName.ALBUS_DUMBLEDORE]: {
    amount: 1,
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    onPlay: (gameState: GameState) => {
      gameState = gameState.players.reduce((gameState, player) => {
        gameState = DrawCardMutation.get().execute(gameState, {
          playerID: player.playerID,
          amount: 1,
        });
        gameState = AddHeartMutation.get().execute(gameState, {
          playerID: player.playerID,
          amount: 1,
        });
        gameState = AddInfluenceTokenMutation.get().execute(gameState, {
          playerID: player.playerID,
          amount: 1,
        });
        gameState = AddAttackTokenMutation.get().execute(gameState, {
          playerID: player.playerID,
          amount: 1,
        });
        return gameState;
      }, gameState);

      return gameState;
    },
  },
  [PlayerHogwartsCardName.DESCENDO]: {
    amount: 2,
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHogwartsCardName.ESSENCE_OF_DITTANY]: {
    amount: 4,
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHogwartsCardName.GOLDEN_SNITCH]: {
    amount: 1,
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHogwartsCardName.INCENDIO]: {
    amount: 4,
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHogwartsCardName.LUMOS]: {
    amount: 2,
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHogwartsCardName.OLIVER_WOOD]: {
    amount: 15,
    onCleanup: () => {
      DefeatVillainMutation.get().remove(PlayerHogwartsCardName.OLIVER_WOOD);
    },
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      DefeatVillainMutation.get().use(
        PlayerHogwartsCardName.OLIVER_WOOD,
        (
          gameState: GameState,
          input: DefeatVillainMutationInput,
          next: MiddlewareNext<DefeatVillainMutationInput>
        ) => {
          gameState = RequireChooseHeroHealPlayerInputMutation.get().execute(
            gameState,
            {
              playerID,
              playerInput: {
                type: PlayerInputType.CHOOSE_ONE_HERO_FOR_HEAL,
                amount: 2,
              },
            }
          );
          return next(gameState, input);
        }
      );

      return AddAttackTokenMutation.get().execute(gameState, {
        playerID,
        amount: 1,
      });
    },
  },
  [PlayerHogwartsCardName.QUIDDITCH_GEAR]: {
    amount: 4,
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHogwartsCardName.REPARO]: {
    amount: 6,
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHogwartsCardName.RUBEUS_HAGRID]: {
    amount: 10,
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      gameState = AddAttackTokenMutation.get().execute(gameState, {
        playerID,
        amount: 1,
      });
      gameState = gameState.players.reduce((gameState, player) => {
        return AddHeartMutation.get().execute(gameState, {
          playerID: player.playerID,
          amount: 1,
        });
      }, gameState);
      return gameState;
    },
  },
  [PlayerHogwartsCardName.SORTING_HAT]: {
    amount: 1,
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
  [PlayerHogwartsCardName.WINGARDIUM_LEVIOSA]: {
    amount: 3,
    onCleanup: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDiscard: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPlay: (gameState: GameState, playerID: PlayerID) => {
      return gameState;
    },
  },
};

function getBaseAllyHeroCardEffect(): PlayerCardEvent {
  return (gameState: GameState, playerID: PlayerID) =>
    RequireChooseEffectPlayerInputMutation.get().execute(gameState, {
      playerID,
      options: [
        {
          text: '1 attack token',
          effect: (gameState: GameState, playerID: PlayerID) => {
            return AddAttackTokenMutation.get().execute(gameState, {
              playerID,
              amount: 1,
            });
          },
        },
        {
          text: '1 heart',
          effect: (gameState: GameState) => {
            return AddHeartMutation.get().execute(gameState, {
              playerID,
              amount: 1,
            });
          },
        },
      ],
    });
}
