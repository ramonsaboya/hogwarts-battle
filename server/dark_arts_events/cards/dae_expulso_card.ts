import {GameState} from '../../game_state';
import {DarkArtsEventsCard} from '../dark_arts_events_card';

export class DarkArtsEventsExpulsoCard extends DarkArtsEventsCard {
  constructor() {
    super('Expulso', '');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyEffect(state: GameState): void {
    throw new Error('Active hero loses 2 health');
  }
}
