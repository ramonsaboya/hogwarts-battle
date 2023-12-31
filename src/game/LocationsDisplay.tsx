import React from 'react';
import './GameContextDisplay.css';
import {LocationsState} from '../../server/locations/locations_state';

type Props = {
  locationsState: LocationsState;
};

export default function LocationsDisplay({locationsState}: Props) {
  console.log('locationsState', locationsState.deck);
  const maybeLocation = locationsState.deck.peek();
  if (maybeLocation === undefined) {
    return <div>error</div>;
  }

  const location = maybeLocation;
  const locationCount = locationsState.initialLocationCount;

  return (
    <div className="GameContextDisplay">
      <div>
        Location: {location.name} ({location.order} of {locationCount})
      </div>
      <div>Dark Arts Events per turn: {location.darkArtsEventsPerTurn}</div>
      <div>Villain control: 0/{location.requiredVillainControl}</div>
    </div>
  );
}
