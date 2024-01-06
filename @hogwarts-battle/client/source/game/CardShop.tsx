import React from 'react';
import PlayerCardDisplay from './PlayerCardDisplay';
import {useAction} from '../socket/useAction';
import {usePlayerView} from './PlayerViewContext';
import {createUseStyles} from 'react-jss';
import {TurnPhase} from '@hogwarts-battle/common';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
  },
  cardShopStackArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardShopStack: {
    height: '150px',
    width: '100px',
    margin: '25px',
    boxSizing: 'border-box',
    borderRadius: '10px',
    border: '1px solid white',
    backgroundColor: 'transparent',
  },
  cardShopAvailableArea: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: '25px',
    paddingBottom: '25px',
  },
  cardWrapper: {
    marginLeft: '50px',
    marginRight: '50px',
  },
});

export default function CardShop() {
  const classes = useStyles();
  const runAction = useAction();
  const {gameStateView} = usePlayerView();

  const cards = gameStateView.playerCards.availableCards;

  const isPlayerActionsPhase =
    gameStateView.turnPhase === TurnPhase.PLAYER_ACTIONS;

  return (
    <div className={classes.container}>
      <div className={classes.cardShopStackArea}>
        <div className={classes.cardShopStack}></div>
      </div>
      <div className={classes.cardShopAvailableArea}>
        {cards.map(cardInstance => (
          <div key={cardInstance.id} className={classes.cardWrapper}>
            <PlayerCardDisplay
              cardInstance={cardInstance}
              onClick={() => {
                runAction({
                  action: 'acquireCard',
                  args: {cardInstance},
                });
              }}
              disabled={!isPlayerActionsPhase}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
