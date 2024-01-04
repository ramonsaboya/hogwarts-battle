import {ActionListener} from '../actions';
import {GameState} from '../game_state';
import {getInternalPlayer} from './players_internal_state';
import {getPlayerCardEffect} from '../player_cards/player_cards_config';
import {
  AddHeartMutation,
  DiscardCardMutation,
} from '../state_mutations/state_mutation_manager';
import {
  ChooseCardEffectArgs,
  ChooseDiscardCardArgs,
  ChooseHeroHealArgs,
  PlayCardActionArgs,
  PlayerID,
  PlayerInputType,
} from '@hogwarts-battle/common';

const playCardAction: ActionListener = [
  'playCard',
  (
    gameState: GameState,
    args: PlayCardActionArgs,
    playerID: PlayerID
  ): GameState => {
    let playerState = getInternalPlayer(gameState.players, playerID);
    if (!playerState) {
      throw new Error('Player not found');
    }

    const cardInstance = args.cardInstance;
    gameState = getPlayerCardEffect(cardInstance.card.name)(
      gameState,
      playerID
    );
    playerState = getInternalPlayer(gameState.players, playerID);
    if (!playerState) {
      throw new Error('Player not found');
    }

    const newHand = playerState.hand.filter(
      card => card.id !== cardInstance.id
    );
    const newDiscardPile = [...playerState.discardPile, cardInstance];
    const newPlayerState = {
      ...playerState,
      hand: newHand,
      discardPile: newDiscardPile,
    };

    const otherPlayers = gameState.players.filter(
      player => player.playerID !== playerID
    );

    return {
      ...gameState,
      players: [...otherPlayers, newPlayerState],
    };
  },
];

const chooseDiscardCardAction: ActionListener = [
  'chooseDiscardCard',
  (
    gameState: GameState,
    args: ChooseDiscardCardArgs,
    playerID: PlayerID
  ): GameState => {
    const playerState = getInternalPlayer(gameState.players, playerID);
    if (!playerState) {
      throw new Error('Player not found');
    }

    if (!playerState.requiredPlayerInput) {
      throw new Error('Player input not found');
    }

    gameState = DiscardCardMutation.get().execute(gameState, {
      playerID,
      cardInstance: args.cardInstance,
    });

    return {
      ...gameState,
      players: gameState.players.map(player => {
        if (player.playerID === playerID) {
          return {
            ...player,
            requiredPlayerInput: null,
          };
        }
        return player;
      }),
    };
  },
];

const chooseCardEffectAction: ActionListener = [
  'chooseCardEffect',
  (
    gameState: GameState,
    args: ChooseCardEffectArgs,
    playerID: PlayerID
  ): GameState => {
    const playerState = getInternalPlayer(gameState.players, playerID);
    if (!playerState) {
      throw new Error('Player not found');
    }

    if (!playerState.requiredPlayerInput) {
      throw new Error('Player input not found');
    }

    const idx = args.option === 'first' ? 0 : 1;
    gameState = playerState.playerInputCallbacks![idx](gameState, playerID);

    return {
      ...gameState,
      players: gameState.players.map(player => {
        if (player.playerID === playerID) {
          return {
            ...player,
            requiredPlayerInput:
              player.requiredPlayerInput?.type ===
              PlayerInputType.CHOOSE_PLAYER_CARD_EFFECT
                ? null
                : player.requiredPlayerInput,
            playerInputCallbacks: null,
          };
        }
        return player;
      }),
    };
  },
];

const chooseHeroHealAction: ActionListener = [
  'chooseHeroHeal',
  (
    gameState: GameState,
    args: ChooseHeroHealArgs,
    playerID: PlayerID
  ): GameState => {
    const playerState = getInternalPlayer(gameState.players, playerID);
    if (!playerState) {
      throw new Error('Player not found');
    }

    if (!playerState.requiredPlayerInput) {
      throw new Error('Player input not found');
    }

    gameState = AddHeartMutation.get().execute(gameState, {
      playerID: args.playerID,
      amount: args.amount,
    });

    return {
      ...gameState,
      players: gameState.players.map(player => {
        if (player.playerID === playerID) {
          return {
            ...player,
            requiredPlayerInput: null,
          };
        }
        return player;
      }),
    };
  },
];

export const actions: ActionListener[] = [
  playCardAction,
  chooseDiscardCardAction,
  chooseCardEffectAction,
  chooseHeroHealAction,
];
