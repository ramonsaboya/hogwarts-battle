import {Stack} from '../stack';
import {LocationCard} from './location_cards';

export interface LocationsExternalState {
  deck: Stack<LocationCard>;
  initialLocationCount: number;
  villainControlTokens: number;
}

export interface SerializedLocationsExternalState {
  deck: LocationCard[];
  initialLocationCount: number;
  villainControlTokens: number;
}

export const serializeLocationsExternalState = (
  state: LocationsExternalState
): SerializedLocationsExternalState => ({
  deck: state.deck.getItems,
  initialLocationCount: state.initialLocationCount,
  villainControlTokens: state.villainControlTokens,
});

export const deserializeLocationsExternalState = (
  state: SerializedLocationsExternalState
): LocationsExternalState => ({
  deck: new Stack(state.deck),
  initialLocationCount: state.initialLocationCount,
  villainControlTokens: state.villainControlTokens,
});
