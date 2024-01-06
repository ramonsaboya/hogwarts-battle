import React from 'react';
import {usePlayerView} from './PlayerViewContext';
import PlayerHandDisplay from './PlayerHandDisplay';
import PlayerGenericPileDisplay from './PlayerGenericPileDisplay';
import {createUseStyles} from 'react-jss';
import PlayerInfoDisplay from './PlayerInfoDisplay';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: '20%',
  },
  info: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hand: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '5px',
    paddingRight: '5px',
  },
  stack: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '5px',
    paddingRight: '5px',
  },
});

export default function SelfPlayerDisplay() {
  const classes = useStyles();

  const {gameStateView} = usePlayerView();
  const player = gameStateView.players.selfPlayer;

  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <PlayerInfoDisplay player={player} />
      </div>
      <div className={classes.hand}>
        <div>hand:</div>
        <PlayerHandDisplay hand={player.hand} />
      </div>
      <div className={classes.stack}>
        <div>cards played this turn:</div>
        <PlayerGenericPileDisplay pile={player.cardsDuringTurnPile} />
      </div>
      <div className={classes.stack}>
        <div>discard:</div>
        <PlayerGenericPileDisplay pile={player.discardPile} />
      </div>
    </div>
  );
}
