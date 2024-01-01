import {GameState} from '../game_state';
import {PlayerID} from '../player_view';

export abstract class DarkArtsEventsCard {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  abstract applyEffect(state: GameState, playerID: PlayerID): GameState;
}
