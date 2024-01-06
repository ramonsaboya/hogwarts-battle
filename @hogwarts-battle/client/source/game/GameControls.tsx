import React from 'react';
import {useAction} from '../socket/useAction';
import GameContextDisplay from './GameContextDisplay';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '10%',
  },
});

export default function GameControls() {
  const classes = useStyles();

  const runAction = useAction();
  const handleEndTurn = () => {
    runAction({action: 'endTurn', args: {}});
  };

  return (
    <div className={classes.container}>
      <GameContextDisplay />
      <button onClick={handleEndTurn}>End Turn</button>
    </div>
  );
}
