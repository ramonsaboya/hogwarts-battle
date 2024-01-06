import React from 'react';
import {usePlayerView} from './PlayerViewContext';
import LocationsDisplay from './LocationsDisplay';
import CardShop from './CardShop';
import VillainsDisplay from './VillainsDisplay';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flex: 1,
  },
});

export default function GameBoard() {
  const classes = useStyles();
  const {gameStateView} = usePlayerView();

  return (
    <div className={classes.container}>
      <LocationsDisplay locationsState={gameStateView.locations} />
      <CardShop playerCardsState={gameStateView.playerCards} />
      <div>Dark Arts Event: {gameStateView.darkArtsEvents.active?.name}</div>
      <VillainsDisplay
        villainsState={gameStateView.villains}
        selfPlayer={gameStateView.players.selfPlayer}
      />
    </div>
  );
}
