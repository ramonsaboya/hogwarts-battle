import {ActionListener} from '../actions';
import {GameState} from '../game_state';
import {
  ChooseCardEffectArgs,
  ChooseDiscardCardArgs,
  PlayCardActionArgs,
  PlayerID,
} from '@hogwarts-battle/common';
import {getInternalPlayer} from './players_internal_state';
import {getPlayerCardEffect} from '../player_cards/player_cards_config';
import {DiscardCardMutation} from '../state_mutations/state_mutation_manager';

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
    gameState = gameState.players
      .find(player => player.playerID === playerID)!
      .playerInputCallbacks![idx](gameState, playerID);

    return {
      ...gameState,
      players: gameState.players.map(player => {
        if (player.playerID === playerID) {
          return {
            ...player,
            requiredPlayerInput: null,
            playerInputCallbacks: null,
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
];
