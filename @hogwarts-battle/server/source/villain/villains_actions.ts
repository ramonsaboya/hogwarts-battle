import {ActionListener} from '../actions';
import {GameState} from '../game_state';

const killVillainAction: ActionListener = [
  'killVillain',
  (state: GameState): GameState => {
    const newDeck = state.villains.deck;
    const newVillain = newDeck.pop();
    if (!newVillain) {
      throw new Error('No more villains');
    }

    const newDiscardPile = [
      ...state.villains.discardPile,
      state.villains.activeVillain,
    ];

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
