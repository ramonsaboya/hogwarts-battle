import React from 'react';
import {usePlayerView} from './PlayerViewContext';
import {createUseStyles} from 'react-jss';
import GameArea from './GameArea';
import PlayerDisplay from './PlayerDisplay';

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

  const {gameStateView} = usePlayerView();

  return (
    <div className={classes.container}>
      <GameArea />
      <div>
        <PlayerDisplay player={gameStateView.players.selfPlayer} />
      </div>
    </div>
  );
}
