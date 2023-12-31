import {PlayerView} from '../../src/game/player_view';
import {GameState} from '../game_state';
import {ActionListener} from '../../src/socket/socket';
import {PlayerID} from '../game';

export interface DarkArtsEventsEvents {
  revealDarkArtsEvent: (
    args: {},
    callback: (playerView: PlayerView) => void
  ) => void;
}

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
