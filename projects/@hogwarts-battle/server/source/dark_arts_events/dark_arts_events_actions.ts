import {ActionListener} from '../actions';
import {GameState, PlayerID} from '@hogwarts-battle/common';

const revealDarkArtsEventAction: ActionListener = [
  'revealDarkArtsEvent',
  (state: GameState, args: {}, playerID: PlayerID): GameState => {
    const activeDarkArtsEvent = state.darkArtsEvents.active;

    const newDeck = state.darkArtsEvents.deck;
    const newDarkArtsEvent = newDeck.pop();
    if (!newDarkArtsEvent) {
      throw new Error('No more dark arts events');
    }
    const newDiscardPile = [
      ...state.darkArtsEvents.discardPile,
      ...(activeDarkArtsEvent ? [activeDarkArtsEvent] : []),
    ];

    state = newDarkArtsEvent.applyEffect(state, playerID);

    return {
      ...state,
      darkArtsEvents: {
        deck: newDeck,
        active: newDarkArtsEvent,
        discardPile: newDiscardPile,
      },
    };
  },
];

export const actions: ActionListener[] = [revealDarkArtsEventAction];
