import React from 'react';
import {createUseStyles} from 'react-jss';
import {usePlayerView} from './PlayerViewContext';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  darkArtsEventCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '200px',
    height: '150px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    border: '1px solid white',
    padding: '10px',
  },
  name: {
    paddingBottom: '10px',
  },
  description: {},
});

export default function DarkArtsEventDisplay() {
  const classes = useStyles();
  const {gameStateView} = usePlayerView();

  const darkArtsEvent = gameStateView.darkArtsEvents.active;

  if (!darkArtsEvent) {
    return null;
  }

  return (
    <div className={classes.container}>
      <div className={classes.darkArtsEventCard}>
        <div className={classes.name}>{darkArtsEvent.name}</div>
        <div className={classes.description}>{darkArtsEvent.description}</div>
      </div>
    </div>
  );
}
