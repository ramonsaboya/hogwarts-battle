import React, {useState} from 'react';
import PlayerCardDisplay from './PlayerCardDisplay';
import {useAction} from '../socket/useAction';
import {PlayerCardInstance} from '@hogwarts-battle/common';

type Props = {
  hand: PlayerCardInstance[];
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
      {hand.map(cardInstance => (
        <PlayerCardDisplay key={cardInstance.id} cardInstance={cardInstance} />
      ))}

      <select value={selectedCard} onChange={handleCardSelection}>
        <option value="">Select a card</option>
        {hand.map((cardInstance, idx) => (
          <option key={cardInstance.id} value={idx}>
            {cardInstance.card.name}
          </option>
        ))}
      </select>
      <button onClick={handlePlayCard}>Play Card</button>
    </>
  );
}
