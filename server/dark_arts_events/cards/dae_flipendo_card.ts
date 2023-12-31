import {PlayerID} from '../../game';
import {GameState} from '../../game_state';
import {DarkArtsEventsCard} from '../dark_arts_events_card';

export class DarkArtsEventsFlipendoCard extends DarkArtsEventsCard {
  constructor() {
    super('Flipendo', '');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyEffect(state: GameState, playerID: PlayerID): GameState {
    throw new Error('Active hero loses 1 health and discards 1 card');
  }
}
