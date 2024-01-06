import React from 'react';
import PlayerCardDisplay from './PlayerCardDisplay';
import {useAction} from '../socket/useAction';
import {PlayerCardInstance, TurnPhase} from '@hogwarts-battle/common';
import {createUseStyles} from 'react-jss';
import {usePlayerView} from './PlayerViewContext';

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
  const {gameStateView} = usePlayerView();
  const runAction = useAction();

  const isPlayerActionsPhase =
    gameStateView.turnPhase === TurnPhase.PLAYER_ACTIONS;

  return (
    <div className={classes.container}>
      {hand.map(cardInstance => (
        <PlayerCardDisplay
          key={cardInstance.id}
          cardInstance={cardInstance}
          onClick={() => runAction({action: 'playCard', args: {cardInstance}})}
          disabled={!isPlayerActionsPhase}
        />
      ))}
    </div>
  );
}
