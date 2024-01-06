import React from 'react';
import {createUseStyles} from 'react-jss';
import {useAction} from '../socket/useAction';
import {usePlayerView} from './PlayerViewContext';
import {TurnPhase} from '@hogwarts-battle/common';

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
    backgroundColor: 'transparent',
    color: 'white',
    cursor: 'pointer',
    '&:enabled:hover': {
      backgroundColor: 'blue',
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
    padding: '10px',
  },
});

export default function DarkArtsEventStack() {
  const classes = useStyles();
  const {gameContext, gameStateView} = usePlayerView();
  const runAction = useAction();

  const isOwnTurn =
    gameContext.currentPlayer === gameStateView.players.selfPlayer.playerID;
  const isDarkArtsEventRevealPhase =
    gameStateView.turnPhase === TurnPhase.DARK_ARTS_EVENT_REVEAL;

  return (
    <div className={classes.container}>
      <button
        className={classes.darkArtsEventCard}
        onClick={() => runAction({action: 'revealDarkArtsEvent', args: {}})}
        disabled={!isDarkArtsEventRevealPhase || !isOwnTurn}
      />
    </div>
  );
}
