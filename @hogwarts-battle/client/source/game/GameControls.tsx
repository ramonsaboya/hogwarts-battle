import React from 'react';
import {usePlayerView} from './PlayerViewContext';
import {useAction} from '../socket/useAction';
import GameContextDisplay from './GameContextDisplay';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  container: {
    flexDirection: 'column',
    width: '10%',
  },
});

export default function GameControls() {
  const classes = useStyles();
  const playerView = usePlayerView();

  const runAction = useAction();

  const handleRevealDarkArtsCard = () => {
    runAction({action: 'revealDarkArtsEvent', args: {}});
  };

  const handleEndTurn = () => {
    runAction({action: 'endTurn', args: {}});
  };

  return (
    <div className={classes.container}>
      <GameContextDisplay
        gameContext={playerView.gameContext}
        turnPhase={playerView.gameStateView.turnPhase}
      />
      <button onClick={handleRevealDarkArtsCard}>Reveal Dark Arts Card</button>
      <button onClick={handleEndTurn}>End Turn</button>
    </div>
  );
}
