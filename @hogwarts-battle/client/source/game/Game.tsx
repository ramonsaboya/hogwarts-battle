import React from 'react';
import {createUseStyles} from 'react-jss';
import GameArea from './GameArea';
import SelfPlayerDisplay from './SelfPlayerDisplay';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
  },
});

export default function Game() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <GameArea />
      <SelfPlayerDisplay />
    </div>
  );
}
