import React from 'react';
import PlayerInfoDisplay from './PlayerInfoDisplay';
import {usePlayerView} from './PlayerViewContext';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    width: '10%',
    flexDirection: 'column',
  },
});

export default function OtherPlayersDisplay() {
  const classes = useStyles();
  const {gameStateView} = usePlayerView();
  const players = gameStateView.players.otherPlayers;

  return (
    <div className={classes.container}>
      {players.map(player => (
        <PlayerInfoDisplay key={player.playerID} player={player} />
      ))}
    </div>
  );
}
