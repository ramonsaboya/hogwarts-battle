import React from 'react';
import CardShop from './CardShop';
import {createUseStyles} from 'react-jss';
import MainBoard from './MainBoard';
import {usePlayerView} from './PlayerViewContext';
import RequiredPlayerInputDisplay from './RequiredPlayerInputDisplay';

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
    return <RequiredPlayerInputDisplay />;
  }

  return (
    <div className={classes.container}>
      <MainBoard />
      <CardShop />
    </div>
  );
}
