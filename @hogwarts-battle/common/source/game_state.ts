import {LocationsState} from './locations_state';
import {PlayersState} from './player_state';
import {VillainsState} from './villains_state';
import {DarkArtsEventsState} from './dark_arts_events/dark_arts_events_state';

export interface GameState {
  players: PlayersState;
  villains: VillainsState;
  darkArtsEvents: DarkArtsEventsState;
  locations: LocationsState;
}
