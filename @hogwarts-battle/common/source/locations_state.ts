import {Stack} from './stack';

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
