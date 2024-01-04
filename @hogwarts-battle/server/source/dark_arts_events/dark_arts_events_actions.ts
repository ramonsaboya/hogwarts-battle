import {ActionListener} from '../actions';
import {PlayerID, TurnPhase} from '@hogwarts-battle/common';
import {GameState} from '../game_state';
import {getDarkArtsEventCardEffect} from './dark_arts_event_cards_config';
import {ChangeTurnPhaseMutation} from '../state_mutations/state_mutation_manager';

const revealDarkArtsEventAction: ActionListener = [
  'revealDarkArtsEvent',
  (gameState: GameState, args: {}, playerID: PlayerID): GameState => {
    const activeDarkArtsEvent = gameState.darkArtsEvents.active;

    const newDeck = gameState.darkArtsEvents.deck;
    const newDarkArtsEventCard = newDeck.pop();
    if (!newDarkArtsEventCard) {
      throw new Error('No more dark arts events');
    }
    const newDiscardPile = [
      ...gameState.darkArtsEvents.discardPile,
      ...(activeDarkArtsEvent ? [activeDarkArtsEvent] : []),
    ];

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
        deck: newDeck,
        active: newDarkArtsEventCard,
        discardPile: newDiscardPile,
      },
    };
  },
];

export const actions: ActionListener[] = [revealDarkArtsEventAction];
