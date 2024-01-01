import React from 'react';
import PlayerCardDisplay from './PlayerCardDisplay';
import {PlayerCard} from '@hogwarts-battle/common';

type Props = {
  pile: PlayerCard[];
};

export default function PlayerDiscardPileDisplay({pile}: Props) {
  return (
    <>
      {pile.map(card => (
        <PlayerCardDisplay key={card.name} card={card} />
      ))}
    </>
  );
}
