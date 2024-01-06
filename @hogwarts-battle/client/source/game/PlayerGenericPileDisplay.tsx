import React from 'react';
import PlayerCardDisplay from './PlayerCardDisplay';
import {PlayerCardInstance} from '@hogwarts-battle/common';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
});

type Props = {
  pile: PlayerCardInstance[];
};

export default function PlayerGenericPileDisplay({pile}: Props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {pile.map(cardInstance => (
        <PlayerCardDisplay
          key={cardInstance.id}
          cardInstance={cardInstance}
          disabled={true}
        />
      ))}
    </div>
  );
}
