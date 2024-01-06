import React from 'react';
import {usePlayerView} from './PlayerViewContext';
import PlayersDisplay from './PlayersDisplay';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  container: {
    width: '10%',
  },
});

export default function OtherPlayersDisplay() {
  const classes = useStyles();
  const {gameStateView} = usePlayerView();

  return (
    <div className={classes.container}>
      <PlayersDisplay players={gameStateView.players.otherPlayers} />
    </div>
  );
}
