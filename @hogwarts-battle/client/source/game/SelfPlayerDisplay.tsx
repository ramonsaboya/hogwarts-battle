import React from 'react';
import {usePlayerView} from './PlayerViewContext';
import {createUseStyles} from 'react-jss';
import PlayerDisplay from './PlayerDisplay';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '20%',
  },
});

export default function SelfPlayerDisplay() {
  const classes = useStyles();

  const {gameStateView} = usePlayerView();

  return (
    <div className={classes.container}>
      <PlayerDisplay player={gameStateView.players.selfPlayer} />
    </div>
  );
}
