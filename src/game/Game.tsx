import React from 'react';
import {usePlayerView} from './PlayerViewContext';
import {useAction} from '../socket/useAction';
import Players from './Players';

export default function Game() {
  const playerView = usePlayerView();
  const runAction = useAction();

  const handleRevealDarkArtsCard = () => {
    runAction({action: 'revealDarkArtsEvent', args: {}});
  };

  if (playerView.activeVillain === undefined) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Players players={[playerView.player, ...playerView.otherPlayers]} />
      <div>Dark Arts Event: {playerView.darkArtsEvents.active?.name}</div>
      <div>Villain: {playerView.activeVillain.name}</div>
      <button onClick={() => runAction({action: 'killVillain', args: {}})}>
        Kill Villain
      </button>
      <button onClick={handleRevealDarkArtsCard}>Reveal Dark Arts Card</button>
    </div>
  );
}
