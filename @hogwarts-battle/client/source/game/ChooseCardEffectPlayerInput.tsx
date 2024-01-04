import React from 'react';
import {useAction} from '../socket/useAction';
import {
  ChooseCardEffectArgs,
  ChooseEffectPlayerInput,
  SelfExternalPlayer,
} from '@hogwarts-battle/common';

type Props = {
  playerState: SelfExternalPlayer;
};

export default function ChooseCardEffectPlayerInput({playerState}: Props) {
  const runAction = useAction();

  const handleOptionChoosen = (option: ChooseCardEffectArgs) => {
    runAction({
      action: 'chooseCardEffect',
      args: option,
    });
  };

  const playerInput =
    playerState.requiredPlayerInput as ChooseEffectPlayerInput;
  const options = playerInput.options;

  return (
    <div>
      <button onClick={() => handleOptionChoosen({option: 'first'})}>
        {options[0]}
      </button>
      <button onClick={() => handleOptionChoosen({option: 'second'})}>
        {options[1]}
      </button>
    </div>
  );
}
