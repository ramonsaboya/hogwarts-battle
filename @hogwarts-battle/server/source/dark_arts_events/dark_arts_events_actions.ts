import {ActionListener} from '../actions';
import {PlayerID, Stack, TurnPhase, shuffle} from '@hogwarts-battle/common';
import {GameState} from '../game_state';
import {getDarkArtsEventCardEffect} from './dark_arts_event_cards_config';
import {ChangeTurnPhaseMutation} from '../state_mutations/state_mutation_manager';

const revealDarkArtsEventAction: ActionListener = [
  'revealDarkArtsEvent',
  (gameState: GameState, args: {}, playerID: PlayerID): GameState => {
    const activeDarkArtsEvent = gameState.darkArtsEvents.active;
    const newDiscardPile = [
      ...gameState.darkArtsEvents.discardPile,
      ...(activeDarkArtsEvent ? [activeDarkArtsEvent] : []),
    ];
    if (gameState.darkArtsEvents.deck.length() === 0) {
      gameState = {
        ...gameState,
        darkArtsEvents: {
          deck: new Stack(shuffle(newDiscardPile)),
          active: null,
          discardPile: [],
        },
      };
    } else {
      gameState = {
        ...gameState,
        darkArtsEvents: {
          ...gameState.darkArtsEvents,
          active: null,
          discardPile: newDiscardPile,
        },
      };
    }

    const newDarkArtsEventCard = gameState.darkArtsEvents.deck.pop()!;

    gameState = getDarkArtsEventCardEffect(newDarkArtsEventCard.name)(
      gameState,
      playerID
    );

    gameState = ChangeTurnPhaseMutation.get().execute(gameState, {
      turnPhase: TurnPhase.VILLAIN_EFFECTS,
    });

    return {
      ...gameState,
      darkArtsEvents: {
        ...gameState.darkArtsEvents,
        active: newDarkArtsEventCard,
      },
    };
  },
];

export const actions: ActionListener[] = [revealDarkArtsEventAction];
