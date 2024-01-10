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

  if (pile.length === 0) {
    return null;
  }

  const mostRecentCard = pile[pile.length - 1];
  return (
    <div className={classes.container}>
      <PlayerCardDisplay cardInstance={mostRecentCard} disabled={true} />
    </div>
  );
}
