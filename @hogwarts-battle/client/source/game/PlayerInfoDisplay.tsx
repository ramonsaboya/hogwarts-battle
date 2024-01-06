import React from 'react';
import {ExternalPlayer} from '@hogwarts-battle/common';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '150px',
    height: '150px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    border: '1px solid white',
    padding: '10px',
    marginTop: '25px',
    marginBottom: '25px',
  },
});

type Props = {
  player: ExternalPlayer;
};

export default function PlayerInfoDisplay({player}: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>{player.playerName}</div>
      <div>{player.hero}</div>
      <div>{player.health} hearts</div>
      <div>{player.influenceTokens} influence</div>
      <div>{player.attackTokens} attack</div>
    </div>
  );
}
