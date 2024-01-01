import {GameState} from '../../game_state';
import {PlayerID} from '../../player_view';
import {DarkArtsEventsCard} from '../dark_arts_events_card';

export class DarkArtsEventsHeWhoMustNotBeNamedCard extends DarkArtsEventsCard {
  constructor() {
    super('He Who Must Not Be Named', '');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyEffect(state: GameState, playerID: PlayerID): GameState {
    throw new Error('Add 1 Villain Control to the location');
  }
}
