import {LOCATIONS_PER_LEVEL} from './locations_levels';
import {LocationsState, Stack} from '@hogwarts-battle/common';

export const getInitialLocationsState = (): LocationsState => {
  const locations = LOCATIONS_PER_LEVEL[1];
  return {
    deck: new Stack(locations.reverse()),
    initialLocationCount: locations.length,
  };
};
