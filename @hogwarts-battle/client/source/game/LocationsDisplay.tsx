import React from 'react';
import './GameContextDisplay.css';
import {LocationsExternalState} from '@hogwarts-battle/common';

type Props = {
  locationsState: LocationsExternalState;
};

export default function LocationsDisplay({locationsState}: Props) {
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
      <div>
        Villain control: {locationsState.villainControlTokens}/
        {location.requiredVillainControl}
      </div>
    </div>
  );
}
