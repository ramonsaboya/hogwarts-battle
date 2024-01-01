import React from 'react';
import {usePlayerView} from './PlayerViewContext';
import {useAction} from '../socket/useAction';
import Players from './Players';
import GameContextDisplay from './GameContextDisplay';
import LocationsDisplay from './LocationsDisplay';

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

  if (gameStateView.villains === undefined) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <GameContextDisplay gameContext={playerView.gameContext} />
      <Players
        players={[gameStateView.player, ...gameStateView.otherPlayers]}
      />
      <LocationsDisplay locationsState={gameStateView.locations} />
      <div>Dark Arts Event: {gameStateView.darkArtsEvents.active?.name}</div>
      <div>Villain: {gameStateView.villains.activeVillain.name}</div>
      <button onClick={() => runAction({action: 'killVillain', args: {}})}>
        Kill Villain
      </button>
      <button onClick={handleRevealDarkArtsCard}>Reveal Dark Arts Card</button>
      <button onClick={handleEndTurn}>End Turn</button>
    </div>
  );
}
