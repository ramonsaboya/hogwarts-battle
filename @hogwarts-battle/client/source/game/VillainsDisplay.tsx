import React from 'react';
import {useAction} from '../socket/useAction';
import {createUseStyles} from 'react-jss';
import {usePlayerView} from './PlayerViewContext';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  villainWithAttacksSlot: {},
  villain: {
    display: 'flex',
    flexDirection: 'column',
    width: '200px',
    height: '150px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    border: '1px solid white',
    backgroundColor: 'transparent',
    color: 'white',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'blue',
    },
    padding: '10px',
  },
  attacksSlot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '200px',
    height: '50px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    border: '1px solid white',
    marginTop: '10px',
  },
  villainName: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  villainContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  villainInfo: {
    display: 'flex',
    flex: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    textAlign: 'start',
  },
  villainDescription: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  villainReward: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  villainHealth: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: '100%',
    paddingRight: '10px',
    paddingBottom: '10px',
  },
});

export default function VillainsDisplay() {
  const classes = useStyles();
  const runAction = useAction();
  const {gameStateView} = usePlayerView();

  const villainsState = gameStateView.villains;
  const villain = villainsState.activeVillain;
  if (!villain) {
    return null;
  }

  return (
    <div className={classes.container}>
      <div className={classes.villainWithAttacksSlot}>
        <button
          className={classes.villain}
          onClick={() =>
            runAction({action: 'attackVillain', args: {attackTokens: 1}})
          }
        >
          <div className={classes.villainName}>{villain.name}</div>
          <div className={classes.villainContent}>
            <div className={classes.villainInfo}>
              <div className={classes.villainDescription}>
                {villain.effectDescription}
              </div>
              <div className={classes.villainReward}>
                {villain.rewardDescription}
              </div>
            </div>
            <div className={classes.villainHealth}>{villain.health}</div>
          </div>
        </button>
        <div className={classes.attacksSlot}>{villainsState.attackTokens}</div>
      </div>
    </div>
  );
}
