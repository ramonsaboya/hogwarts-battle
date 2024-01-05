import {ActionListener} from '../actions';
import {GameState} from '../game_state';
import {AttackVillainMutation} from '../state_mutations/state_mutation_manager';
import {AttackVillainArgs, PlayerID} from '@hogwarts-battle/common';

const attackVillainAction: ActionListener = [
  'attackVillain',
  (
    gameState: GameState,
    args: AttackVillainArgs,
    playerID: PlayerID
  ): GameState => {
    return AttackVillainMutation.get().execute(gameState, {
      playerID,
      attackTokens: args.attackTokens,
    });
  },
];

export const actions: ActionListener[] = [attackVillainAction];
