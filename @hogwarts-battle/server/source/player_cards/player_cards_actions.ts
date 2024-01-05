import {ActionListener} from '../actions';
import {GameState} from '../game_state';
import {AcquireCardActionArgs, PlayerID} from '@hogwarts-battle/common';
import {AcquireCardMutation} from '../state_mutations/state_mutation_manager';

const acquireCardAction: ActionListener = [
  'acquireCard',
  (
    gameState: GameState,
    {cardInstance}: AcquireCardActionArgs,
    playerID: PlayerID
  ): GameState =>
    AcquireCardMutation.get().execute(gameState, {
      playerID,
      cardInstance,
      target: 'DISCARD_PILE',
    }),
];

export const actions: ActionListener[] = [acquireCardAction];
