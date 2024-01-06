import React from 'react';
import {createUseStyles} from 'react-jss';
import GameArea from './GameArea';
import SelfPlayerDisplay from './SelfPlayerDisplay';
import {usePlayerView} from './PlayerViewContext';
import {GameResult} from '@hogwarts-battle/common';

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
  const {gameContext} = usePlayerView();

  if (gameContext.gameResult !== null) {
    const gameResult = gameContext.gameResult;
    if (gameResult === GameResult.WIN) {
      return <div>YOU WIN!</div>;
    } else if (gameResult === GameResult.LOSS) {
      return <div>YOU LOSE!</div>;
    }
  }

  return (
    <div className={classes.container}>
      <GameArea />
      <SelfPlayerDisplay />
    </div>
  );
}
