import React from 'react';
import LocationsDisplay from './LocationsDisplay';
import VillainsDisplay from './VillainsDisplay';
import {createUseStyles} from 'react-jss';
import DarkArtsEventDisplay from './DarkArtsEventDisplay';
import DarkArtsEventStack from './DarkArtsEventStack';
import {usePlayerView} from './PlayerViewContext';
import {PlayerInputType} from '@hogwarts-battle/common';
import RequiredPlayerInputDisplay from './RequiredPlayerInputDisplay';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingLeft: '75px',
    paddingRight: '75px',
  },
  locationAndDarkArtsEvents: {
    display: 'flex',
    flex: 3,
    justifyContent: 'start',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  villainStackAndDiscard: {
    display: 'flex',
    flex: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  villains: {
    display: 'flex',
    flex: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  darkArtsEvents: {
    display: 'flex',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
});

export default function MainBoard() {
  const classes = useStyles();
  const {gameStateView} = usePlayerView();

  let requiredInput = null;
  if (gameStateView.players.selfPlayer.requiredPlayerInput !== null) {
    if (
      gameStateView.players.selfPlayer.requiredPlayerInput.type !==
      PlayerInputType.CHOOSE_DISCARD_CARD
    ) {
      requiredInput = <RequiredPlayerInputDisplay />;
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.locationAndDarkArtsEvents}>
        <LocationsDisplay />
        <div className={classes.darkArtsEvents}>
          <DarkArtsEventStack />
          <DarkArtsEventDisplay />
        </div>
      </div>
      <div className={classes.villainStackAndDiscard}>{requiredInput}</div>
      <div className={classes.villains}>
        <VillainsDisplay />
      </div>
    </div>
  );
}
