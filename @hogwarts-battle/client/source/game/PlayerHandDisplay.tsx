import React from 'react';
import PlayerCardDisplay from './PlayerCardDisplay';
import {useAction} from '../socket/useAction';
import {
  ChooseCardPlayerInput,
  PlayerCardInstance,
  PlayerInputType,
  TurnPhase,
} from '@hogwarts-battle/common';
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
  const {gameContext, gameStateView} = usePlayerView();
  const runAction = useAction();

  const requiredPlayerInput =
    gameStateView.players.selfPlayer.requiredPlayerInput;

  const isOwnTurn =
    gameContext.currentPlayer === gameStateView.players.selfPlayer.playerID;
  const requiredOtherThanDiscard =
    requiredPlayerInput !== null &&
    requiredPlayerInput.type !== PlayerInputType.CHOOSE_DISCARD_CARD;
  const isPlayerActionsPhase =
    gameStateView.turnPhase === TurnPhase.PLAYER_ACTIONS;

  const disableAction =
    !isPlayerActionsPhase || !isOwnTurn || requiredOtherThanDiscard;

  const requiredDiscard =
    requiredPlayerInput?.type === PlayerInputType.CHOOSE_DISCARD_CARD;

  return (
    <div className={classes.container}>
      {hand.map(cardInstance => (
        <PlayerCardDisplay
          key={cardInstance.id}
          cardInstance={cardInstance}
          onClick={() => {
            if (disableAction) {
              return;
            }
            if (requiredDiscard) {
              const requiredDiscardAmount = (
                requiredPlayerInput as ChooseCardPlayerInput
              ).amount;
              runAction({
                action: 'chooseDiscardCard',
                args: {
                  cardInstance,
                  remainingAmount: requiredDiscardAmount - 1,
                },
              });
            } else {
              runAction({action: 'playCard', args: {cardInstance}});
            }
          }}
          disabled={disableAction}
        />
      ))}
    </div>
  );
}
