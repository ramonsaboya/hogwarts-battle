import React, {useState} from 'react';
import {usePlayerView} from './PlayerViewContext';
import {useAction} from '../socket/useAction';

export default function Game() {
  const playerView = usePlayerView();
  const runAction = useAction();
  const [selectedCard, setSelectedCard] = useState(-1);

  const handleCardSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCard(parseInt(event.target.value));
  };

  const handlePlayCard = () => {
    runAction({action: 'playCard', args: {cardIndex: selectedCard}});
  };

  const handleRevealDarkArtsCard = () => {
    runAction({action: 'revealDarkArtsEvent', args: {}});
  };

  if (playerView.activeVillain === undefined) {
    return <div>loading...</div>;
  }

  const playerState = playerView.player;

  return (
    <div>
      <div>Player health: {playerView.player.health}</div>
      <div>Dark Arts Event: {playerView.darkArtsEvents.active?.name}</div>
      <div>Villain: {playerView.activeVillain.name}</div>
      <button onClick={() => runAction({action: 'killVillain', args: {}})}>
        Kill Villain
      </button>
      <select value={selectedCard} onChange={handleCardSelection}>
        <option value="">Select a card</option>
        {playerState.hand.map((card, idx) => (
          <option key={card.name} value={idx}>
            {card.name}
          </option>
        ))}
      </select>
      <button onClick={handlePlayCard}>Play Card</button>
      <button onClick={handleRevealDarkArtsCard}>Reveal Dark Arts Card</button>
    </div>
  );
}
