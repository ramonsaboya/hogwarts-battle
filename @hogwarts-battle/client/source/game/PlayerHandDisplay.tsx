import React from 'react';
import PlayerCardDisplay from './PlayerCardDisplay';
import {useAction} from '../socket/useAction';
import {PlayerCardInstance} from '@hogwarts-battle/common';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
});

type Props = {
  hand: PlayerCardInstance[];
};

export default function PlayerHandDisplay({hand}: Props) {
  const classes = useStyles();
  const runAction = useAction();

  return (
    <div className={classes.container}>
      {hand.map(cardInstance => (
        <PlayerCardDisplay
          key={cardInstance.id}
          cardInstance={cardInstance}
          onClick={() => runAction({action: 'playCard', args: {cardInstance}})}
        />
      ))}
    </div>
  );
}
