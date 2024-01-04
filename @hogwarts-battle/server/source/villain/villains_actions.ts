import {PlayerID} from '@hogwarts-battle/common';
import {ActionListener} from '../actions';
import {GameState} from '../game_state';
import {onVillainDefeat, onVillainReveal} from './villain_cards_config';

const killVillainAction: ActionListener = [
  'killVillain',
  (state: GameState, args: {}, playerID: PlayerID): GameState => {
    const newDeck = state.villains.deck;
    const newVillain = newDeck.pop();
    if (!newVillain) {
      throw new Error('No more villains');
    }

    const oldVillain = state.villains.activeVillain;

    state = onVillainDefeat(oldVillain.name)(state, playerID);
    state = onVillainReveal(newVillain.name)(state, playerID);

    const newDiscardPile = [...state.villains.discardPile, oldVillain];

    return {
      ...state,
      villains: {
        deck: newDeck,
        activeVillain: newVillain,
        discardPile: newDiscardPile,
      },
    };
  },
];

export const actions: ActionListener[] = [killVillainAction];
