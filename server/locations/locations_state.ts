import {Stack} from '../../common/stack';
import {LOCATIONS_PER_LEVEL} from './locations_levels';

export interface GameLocation {
  name: string;
  order: number;
  darkArtsEventsPerTurn: number;
  requiredVillainControl: number;
}

export interface LocationsState {
  deck: Stack<GameLocation>;
  initialLocationCount: number;
}

export const getInitialLocationsState = (): LocationsState => {
  const locations = LOCATIONS_PER_LEVEL[1];
  return {
    deck: new Stack(locations.reverse()),
    initialLocationCount: locations.length,
  };
};

export interface SerializedLocationsState {
  deck: GameLocation[];
  initialLocationCount: number;
}

export const serializeLocationsState: (
  locationsState: LocationsState
) => SerializedLocationsState = locationsState => ({
  deck: locationsState.deck.getItems,
  initialLocationCount: locationsState.initialLocationCount,
});

export const deserializeLocationsState: (
  serializedLocationsState: SerializedLocationsState
) => LocationsState = serializedLocationsState => ({
  deck: new Stack(serializedLocationsState.deck),
  initialLocationCount: serializedLocationsState.initialLocationCount,
});
