import React from 'react';
import {createUseStyles} from 'react-jss';
import {Hero} from '@hogwarts-battle/common';
import PlayerInfoDisplay from './PlayerInfoDisplay';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    width: '10%',
    flexDirection: 'column',
  },
});

export default function OtherPlayersDisplay() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <PlayerInfoDisplay
        player={{
          health: 10,
          attackTokens: 0,
          influenceTokens: 0,
          hero: Hero.NEVILLE,
          playerID: 131243,
          requiredPlayerInput: null,
        }}
      />
      <PlayerInfoDisplay
        player={{
          health: 10,
          attackTokens: 0,
          influenceTokens: 0,
          hero: Hero.HERMIONE,
          playerID: 13123,
          requiredPlayerInput: null,
        }}
      />
    </div>
  );
}
