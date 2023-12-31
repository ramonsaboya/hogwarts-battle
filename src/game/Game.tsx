import React from 'react';
import {usePlayerView} from './PlayerViewContext';
import {useAction} from '../socket/useAction';
import Players from './Players';

export default function Game() {
  const playerView = usePlayerView();
  const runAction = useAction();
  const gameStateView = playerView.gameStateView;

  const handleRevealDarkArtsCard = () => {
    runAction({action: 'revealDarkArtsEvent', args: {}});
  };

  const handleEndTurn = () => {
    runAction({action: 'endTurn', args: {}});
  };

  if (gameStateView.activeVillain === undefined) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Players
        players={[gameStateView.player, ...gameStateView.otherPlayers]}
      />
      <div>Dark Arts Event: {gameStateView.darkArtsEvents.active?.name}</div>
      <div>Villain: {gameStateView.activeVillain.name}</div>
      <button onClick={() => runAction({action: 'killVillain', args: {}})}>
        Kill Villain
      </button>
      <button onClick={handleRevealDarkArtsCard}>Reveal Dark Arts Card</button>
      <button onClick={handleEndTurn}>End Turn</button>
    </div>
  );
}
