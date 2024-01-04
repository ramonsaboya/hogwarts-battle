import React, {useState} from 'react';
import {useAction} from '../socket/useAction';
import PlayerCardDisplay from './PlayerCardDisplay';
import {SelfExternalPlayer} from '@hogwarts-battle/common';

type Props = {
  playerState: SelfExternalPlayer;
};

export default function ChooseDiscardCardPlayerInput({playerState}: Props) {
  const runAction = useAction();
  const [selectedCard, setSelectedCard] = useState(-1);
  const hand = playerState.hand;

  const handleCardSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCard(parseInt(event.target.value));
  };

  const handlePlayCard = () => {
    runAction({
      action: 'chooseDiscardCard',
      args: {cardInstance: hand[selectedCard]},
    });
  };

  return (
    <div>
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
      <button onClick={handlePlayCard}>Discard Card</button>
    </div>
  );
}
