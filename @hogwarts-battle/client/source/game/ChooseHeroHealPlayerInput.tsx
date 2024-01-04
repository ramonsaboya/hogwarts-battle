import React from 'react';
import {useAction} from '../socket/useAction';
import {
  ChooseHeroHealPlayerInput,
  PlayerID,
  PlayersExternalState,
} from '@hogwarts-battle/common';

type Props = {
  playersState: PlayersExternalState;
};

export default function ChooseHeroHealPlayerInput({playersState}: Props) {
  const runAction = useAction();

  const playerInput = playersState.selfPlayer
    .requiredPlayerInput as ChooseHeroHealPlayerInput;
  const amount = playerInput.amount;

  const handleOptionChoosen = (playerID: PlayerID) => {
    runAction({
      action: 'chooseHeroHeal',
      args: {playerID, amount},
    });
  };

  const connectedPlayers = [
    playersState.selfPlayer,
    ...playersState.otherPlayers,
  ];

  return (
    <div>
      {connectedPlayers.map(player => (
        <button
          key={player.playerID}
          onClick={() => handleOptionChoosen(player.playerID)}
        >
          {player.hero}
        </button>
      ))}
    </div>
  );
}
