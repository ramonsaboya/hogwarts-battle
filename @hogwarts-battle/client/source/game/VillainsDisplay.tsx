import React, {useState} from 'react';
import {useAction} from '../socket/useAction';
import {
  SelfExternalPlayer,
  VillainsExternalState,
} from '@hogwarts-battle/common';

type Props = {
  selfPlayer: SelfExternalPlayer;
  villainsState: VillainsExternalState;
};

export default function VillainsDisplay({villainsState}: Props) {
  const runAction = useAction();
  const [attackTokens, setAttackTokens] = useState(0);

  const handleAttackVillain = () => {
    runAction({action: 'attackVillain', args: {attackTokens}});
  };

  const villain = villainsState.activeVillain;

  return (
    <>
      <div>
        Villain: {villain?.name}({villain?.health})
      </div>
      <div>Attack Tokens: {villainsState.attackTokens}</div>
      <input
        type="number"
        value={attackTokens}
        onChange={e => setAttackTokens(Number(e.target.value))}
      />
      <button onClick={handleAttackVillain}>Attack Villain</button>
    </>
  );
}
