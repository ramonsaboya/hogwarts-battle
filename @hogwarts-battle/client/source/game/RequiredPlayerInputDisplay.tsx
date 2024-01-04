import React from 'react';
import GameContextDisplay from './GameContextDisplay';
import ChooseDiscardCardPlayerInput from './ChooseDiscardCardPlayerInput';
import {PlayerInputType, PlayerView} from '@hogwarts-battle/common';
import ChooseCardEffectPlayerInput from './ChooseCardEffectPlayerInput';
import ChooseHeroHealPlayerInput from './ChooseHeroHealPlayerInput';

type Props = {
  playerView: PlayerView;
};

export default function RequiredPlayerInputDisplay({playerView}: Props) {
  const playersState = playerView.gameStateView.players;
  const selfPlayer = playersState.selfPlayer;
  const requiredPlayerInput = selfPlayer.requiredPlayerInput;

  return (
    <div>
      <GameContextDisplay
        gameContext={playerView.gameContext}
        turnPhase={playerView.gameStateView.turnPhase}
      />
      {(() => {
        switch (requiredPlayerInput?.type) {
          case PlayerInputType.CHOOSE_DISCARD_CARD:
            return <ChooseDiscardCardPlayerInput playerState={selfPlayer} />;
          case PlayerInputType.CHOOSE_PLAYER_CARD_EFFECT:
            return <ChooseCardEffectPlayerInput playerState={selfPlayer} />;
          case PlayerInputType.CHOOSE_ONE_HERO_FOR_HEAL:
            return <ChooseHeroHealPlayerInput playersState={playersState} />;
        }
      })()}
    </div>
  );
}
