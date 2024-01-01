import React, {useState} from 'react';
import PlayerCard from './PlayerCard';
import {useAction} from '../socket/useAction';
import {Card} from '@hogwarts-battle/common';

type Props = {
  hand: Card[];
};

export default function PlayerHand({hand}: Props) {
  const runAction = useAction();
  const [selectedCard, setSelectedCard] = useState(-1);

  const handleCardSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCard(parseInt(event.target.value));
  };

  const handlePlayCard = () => {
    runAction({action: 'playCard', args: {cardIndex: selectedCard}});
  };

  return (
    <>
      {hand.map(card => (
        <PlayerCard key={card.name} card={card} />
      ))}

      <select value={selectedCard} onChange={handleCardSelection}>
        <option value="">Select a card</option>
        {hand.map((card, idx) => (
          <option key={card.name} value={idx}>
            {card.name}
          </option>
        ))}
      </select>
      <button onClick={handlePlayCard}>Play Card</button>
    </>
  );
}
