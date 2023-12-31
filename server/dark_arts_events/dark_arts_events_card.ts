import {GameState} from '../game_state';

export abstract class DarkArtsEventsCard {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  abstract applyEffect(state: GameState): void;
}
