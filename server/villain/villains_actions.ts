import {PlayerView} from '../../src/game/player_view';
import {GameState} from '../game_state';
import {ActionListener} from '../../src/socket/socket';

export interface VillainsEvents {
  killVillain: (args: {}, callback: (playerView: PlayerView) => void) => void;
}

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
