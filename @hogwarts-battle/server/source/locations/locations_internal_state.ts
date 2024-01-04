import {
  LocationsExternalState,
  Stack,
  LOCATION_CARDS,
  serializeLocationsExternalState,
  SerializedLocationsExternalState,
} from '@hogwarts-battle/common';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LocationsInternalState extends LocationsExternalState {}

export function getInitialLocationsState(): LocationsExternalState {
  const locations = LOCATION_CARDS.sort((a, b) => a.order - b.order);
  return {
    deck: new Stack(locations.reverse()),
    initialLocationCount: locations.length,
    villainControlTokens: 0,
  };
}

export function convertAndSerializeLocationsState(
  state: LocationsInternalState
): SerializedLocationsExternalState {
  return serializeLocationsExternalState(state);
}
