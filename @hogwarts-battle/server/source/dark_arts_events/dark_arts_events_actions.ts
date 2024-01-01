import {ActionListener} from '../actions';
import {PlayerID} from '@hogwarts-battle/common';
import {GameState} from '../game_state';
import {getDarkArtsEventCardEffect} from './dark_arts_event_cards_config';

const revealDarkArtsEventAction: ActionListener = [
  'revealDarkArtsEvent',
  (state: GameState, args: {}, playerID: PlayerID): GameState => {
    const activeDarkArtsEvent = state.darkArtsEvents.active;

    const newDeck = state.darkArtsEvents.deck;
    const newDarkArtsEventCard = newDeck.pop();
    if (!newDarkArtsEventCard) {
      throw new Error('No more dark arts events');
    }
    const newDiscardPile = [
      ...state.darkArtsEvents.discardPile,
      ...(activeDarkArtsEvent ? [activeDarkArtsEvent] : []),
    ];

    state = getDarkArtsEventCardEffect(newDarkArtsEventCard.name)(
      state,
      playerID
    );

    return {
      ...state,
      darkArtsEvents: {
        deck: newDeck,
        active: newDarkArtsEventCard,
        discardPile: newDiscardPile,
      },
    };
  },
];

export const actions: ActionListener[] = [revealDarkArtsEventAction];
