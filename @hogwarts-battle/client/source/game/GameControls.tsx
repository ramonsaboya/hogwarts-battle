import React from 'react';
import {useAction} from '../socket/useAction';
import GameContextDisplay from './GameContextDisplay';
import {createUseStyles} from 'react-jss';
import {usePlayerView} from './PlayerViewContext';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '10%',
  },
});

export default function GameControls() {
  const classes = useStyles();
  const {gameContext, gameStateView} = usePlayerView();

  const isOwnTurn =
    gameContext.currentPlayer === gameStateView.players.selfPlayer.playerID;

  const runAction = useAction();
  const handleEndTurn = () => {
    if (!isOwnTurn) {
      return;
    }
    runAction({action: 'endTurn', args: {}});
  };

  return (
    <div className={classes.container}>
      <GameContextDisplay />
      <button onClick={handleEndTurn} disabled={!isOwnTurn}>
        End Turn
      </button>
    </div>
  );
}
