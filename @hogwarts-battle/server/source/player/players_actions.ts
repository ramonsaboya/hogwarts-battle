import {ActionListener} from '../actions';
import {GameState} from '../game_state';
import {PlayCardActionArgs, PlayerID} from '@hogwarts-battle/common';
import {getInternalPlayer} from './players_internal_state';
import {getPlayerCardEffect} from '../player_cards/player_cards_config';

const playCardAction: ActionListener = [
  'playCard',
  (
    state: GameState,
    args: PlayCardActionArgs,
    playerID: PlayerID
  ): GameState => {
    let playerState = getInternalPlayer(state.players, playerID);
    if (!playerState) {
      throw new Error('Player not found');
    }

    const cardInstance = playerState.hand[args.cardIndex];
    state = getPlayerCardEffect(cardInstance.card.name)(state, playerID);
    playerState = getInternalPlayer(state.players, playerID);
    if (!playerState) {
      throw new Error('Player not found');
    }

    const newHand = playerState.hand.filter((_, i) => i !== args.cardIndex);
    const newDiscardPile = [...playerState.discardPile, cardInstance];
    const newPlayerState = {
      ...playerState,
      hand: newHand,
      discardPile: newDiscardPile,
    };

    const otherPlayers = state.players.filter(
      player => player.playerID !== playerID
    );

    return {
      ...state,
      players: [...otherPlayers, newPlayerState],
    };
  },
];

export const actions: ActionListener[] = [playCardAction];
