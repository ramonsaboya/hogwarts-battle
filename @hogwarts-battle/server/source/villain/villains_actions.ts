import {ActionListener} from '../actions';
import {GameState} from '@hogwarts-battle/common';

const killVillainAction: ActionListener = [
  'killVillain',
  (state: GameState): GameState => {
    const newDeck = state.villains.deck;
    const newVillain = newDeck.pop();
    if (!newVillain) {
      throw new Error('No more villains');
    }

    return {
      ...state,
      villains: {
        deck: newDeck,
        active: newVillain,
      },
    };
  },
];

export const actions: ActionListener[] = [killVillainAction];
