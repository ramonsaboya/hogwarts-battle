import React from 'react';
import {PlayerInputType} from '@hogwarts-battle/common';
import ChooseCardEffectPlayerInput from './ChooseCardEffectPlayerInput';
import ChooseHeroHealPlayerInput from './ChooseHeroHealPlayerInput';
import {usePlayerView} from './PlayerViewContext';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function RequiredPlayerInputDisplay() {
  const classes = useStyles();
  const playerView = usePlayerView();

  const playersState = playerView.gameStateView.players;
  const selfPlayer = playersState.selfPlayer;
  const requiredPlayerInput = selfPlayer.requiredPlayerInput;

  return (
    <div className={classes.container}>
      {(() => {
        switch (requiredPlayerInput?.type) {
          case PlayerInputType.CHOOSE_PLAYER_CARD_EFFECT:
            return <ChooseCardEffectPlayerInput playerState={selfPlayer} />;
          case PlayerInputType.CHOOSE_ONE_HERO_FOR_HEAL:
            return <ChooseHeroHealPlayerInput playersState={playersState} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}
