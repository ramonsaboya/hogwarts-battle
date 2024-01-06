import React from 'react';
import {createUseStyles} from 'react-jss';
import GameControls from './GameControls';
import GameBoard from './GameBoard';
import OtherPlayersDisplay from './OtherPlayersDisplay';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
});

export default function GameArea() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <GameControls />
      <GameBoard />
      <OtherPlayersDisplay />
    </div>
  );
}
