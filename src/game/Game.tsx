import React from 'react';
import {usePlayerView} from './PlayerViewContext';
import {useAction} from '../socket/useAction';

export default function Game() {
  const playerView = usePlayerView();
  const runAction = useAction();

  if (playerView.activeVillain === undefined) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>{playerView.activeVillain.name}</div>
      <button onClick={() => runAction('kill villain')}>Kill Villain</button>
    </div>
  );
}
