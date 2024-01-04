import React from 'react';
import GameContextDisplay from './GameContextDisplay';
import ChooseDiscardCardPlayerInput from './ChooseDiscardCardPlayerInput';
import {PlayerInputType, PlayerView} from '@hogwarts-battle/common';

type Props = {
  playerView: PlayerView;
};

export default function RequiredPlayerInputDisplay({playerView}: Props) {
  const selfPlayer = playerView.gameStateView.players.selfPlayer;
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
          default:
            return <div>Unknown required player input</div>;
        }
      })()}
    </div>
  );
}
