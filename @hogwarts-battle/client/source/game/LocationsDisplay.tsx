import React from 'react';
import {createUseStyles} from 'react-jss';
import {usePlayerView} from './PlayerViewContext';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  locationCard: {
    display: 'flex',
    flexDirection: 'column',
    width: '200px',
    height: '150px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    border: '1px solid white',
    padding: '10px',
  },
  nameAndOrder: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  darkArtsEventCount: {
    display: 'flex',
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  villainControlTokens: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkArtsEventCountText: {
    width: '60%',
    textAlign: 'end',
  },
});

export default function LocationsDisplay() {
  const classes = useStyles();
  const {gameStateView} = usePlayerView();
  const locationsState = gameStateView.locations;

  const location = locationsState.deck.peek()!;
  const locationCount = locationsState.initialLocationCount;

  return (
    <div className={classes.container}>
      <div className={classes.locationCard}>
        <div className={classes.nameAndOrder}>
          <div> {location.name}</div>
          <div>
            ({location.order} of {locationCount})
          </div>
        </div>
        <div className={classes.darkArtsEventCount}>
          <div className={classes.darkArtsEventCountText}>
            Each turn reveals {location.darkArtsEventsPerTurn} Dark Arts event.
          </div>
        </div>
        <div className={classes.villainControlTokens}>
          <div>
            {locationsState.villainControlTokens}/
            {location.requiredVillainControl}
          </div>
        </div>
      </div>
    </div>
  );
}
