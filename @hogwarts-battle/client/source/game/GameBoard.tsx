import React from 'react';
import CardShop from './CardShop';
import {createUseStyles} from 'react-jss';
import MainBoard from './MainBoard';
import {usePlayerView} from './PlayerViewContext';
import RequiredPlayerInputDisplay from './RequiredPlayerInputDisplay';
import {PlayerInputType} from '@hogwarts-battle/common';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flex: 1,
  },
});

export default function GameBoard() {
  const classes = useStyles();
  const {gameStateView} = usePlayerView();

  if (gameStateView.players.selfPlayer.requiredPlayerInput !== null) {
    if (
      gameStateView.players.selfPlayer.requiredPlayerInput.type !==
      PlayerInputType.CHOOSE_DISCARD_CARD
    ) {
      return <RequiredPlayerInputDisplay />;
    }
  }

  return (
    <div className={classes.container}>
      <MainBoard />
      <CardShop />
    </div>
  );
}
