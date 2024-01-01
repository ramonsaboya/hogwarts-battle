import {Stack} from '../stack';
import {LocationCard} from './location_cards';

export interface LocationsExternalState {
  deck: Stack<LocationCard>;
  initialLocationCount: number;
}

export interface SerializedLocationsExternalState {
  deck: LocationCard[];
  initialLocationCount: number;
}

export const serializeLocationsState = (
  state: LocationsExternalState
): SerializedLocationsExternalState => ({
  deck: state.deck.getItems,
  initialLocationCount: state.initialLocationCount,
});

export const deserializeLocationsState = (
  state: SerializedLocationsExternalState
): LocationsExternalState => ({
  deck: new Stack(state.deck),
  initialLocationCount: state.initialLocationCount,
});
