import {GameState} from '../../game_state';
import {DarkArtsEventsCard} from '../dark_arts_events_card';

export class DarkArtsEventsPetrificationCard extends DarkArtsEventsCard {
  constructor() {
    super('Petrification', '');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyEffect(state: GameState): void {
    throw new Error('Active hero discards 1 card'); // TODO double check this, not confirmed
  }
}
