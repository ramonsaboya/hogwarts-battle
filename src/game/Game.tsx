import React from 'react';
import {socket} from '../socket/socket';
import {PlayerView} from './player_view';
import {usePlayerView, useSetPlayerView} from './PlayerViewContext';

export default function Game() {
  const playerView = usePlayerView();
  const setPlayerView = useSetPlayerView();

  if (playerView.activeVillain === undefined) {
    return <div>loading...</div>;
  }

  function handleKillVillain() {
    socket.emit('kill villain', (playerView: PlayerView) => {
      console.log('kill villain callback', playerView);
      setPlayerView(playerView);
    });
  }

  return (
    <div>
      <div>{playerView.activeVillain.name}</div>
      <button onClick={handleKillVillain}>Kill Villain</button>
    </div>
  );
}
