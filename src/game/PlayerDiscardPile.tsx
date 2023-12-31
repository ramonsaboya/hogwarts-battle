import React from 'react';
import {Card} from '../../server/player/player_state';
import PlayerCard from './PlayerCard';

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
