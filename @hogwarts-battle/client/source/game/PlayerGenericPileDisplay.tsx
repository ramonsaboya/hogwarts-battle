import React from 'react';
import PlayerCardDisplay from './PlayerCardDisplay';
import {PlayerCardInstance} from '@hogwarts-battle/common';

type Props = {
  pile: PlayerCardInstance[];
};

export default function PlayerGenericPileDisplay({pile}: Props) {
  return (
    <>
      {pile.map(cardInstance => (
        <PlayerCardDisplay key={cardInstance.id} cardInstance={cardInstance} />
      ))}
    </>
  );
}
