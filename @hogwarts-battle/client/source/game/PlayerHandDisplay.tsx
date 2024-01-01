import React, {useState} from 'react';
import PlayerCardDisplay from './PlayerCardDisplay';
import {useAction} from '../socket/useAction';
import {PlayerCard} from '@hogwarts-battle/common';

type Props = {
  hand: PlayerCard[];
};

export default function PlayerHandDisplay({hand}: Props) {
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
        <PlayerCardDisplay key={card.name} card={card} />
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
