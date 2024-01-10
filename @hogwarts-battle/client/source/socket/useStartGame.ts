import {useCallback} from 'react';
import {getSocket} from './socket';
import {useSetPlayerView} from '../game/PlayerViewContext';
import {SerializedPlayerView} from '@hogwarts-battle/common';

export function useStartGame() {
  const setPlayerView = useSetPlayerView();
  const socket = getSocket();

  const runAction = useCallback(() => {
    socket.emit('startGame', {}, (playerView: SerializedPlayerView) => {
      console.log('startGame callback', playerView);
      setPlayerView(playerView);
    });
  }, [setPlayerView, socket]);

  return runAction;
}
