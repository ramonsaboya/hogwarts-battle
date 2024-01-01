import React from 'react';
import PlayerCard from './PlayerCard';
import {Card} from '@hogwarts-battle/common';

type Props = {
  pile: Card[];
};

export default function PlayerDiscardPile({pile}: Props) {
  return (
    <>
      {pile.map(card => (
        <PlayerCard key={card.name} card={card} />
      ))}
    </>
  );
}
