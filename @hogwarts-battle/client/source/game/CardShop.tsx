import React, {useState} from 'react';
import PlayerCardDisplay from './PlayerCardDisplay';
import {useAction} from '../socket/useAction';
import {PlayerCardsExternalState} from '@hogwarts-battle/common';

type Props = {
  playerCardsState: PlayerCardsExternalState;
};

export default function CardShop({playerCardsState}: Props) {
  const runAction = useAction();
  const [selectedCard, setSelectedCard] = useState(-1);

  const cards = playerCardsState.availableCards;

  const handleCardSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCard(parseInt(event.target.value));
  };

  const handlePlayCard = () => {
    runAction({action: 'acquireCard', args: {cardIndex: selectedCard}});
  };

  return (
    <>
      {cards.map(cardInstance => (
        <PlayerCardDisplay key={cardInstance.id} cardInstance={cardInstance} />
      ))}

      <select value={selectedCard} onChange={handleCardSelection}>
        <option value="">Select a card</option>
        {cards.map((cardInstance, idx) => (
          <option key={cardInstance.id} value={idx}>
            {cardInstance.card.name}
          </option>
        ))}
      </select>
      <button onClick={handlePlayCard}>Acquire a Card</button>
    </>
  );
}
