import {useCallback} from 'react';
import {ActionEmitter, socket} from './socket';
import {useSetPlayerView} from '../game/PlayerViewContext';
import {PlayerView} from '../game/player_view';

export function useAction() {
  const setPlayerView = useSetPlayerView();

  const runAction = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({action, args}: ActionEmitter) => {
      console.log('runAction', action, args);
      socket.emit(action, args, (playerView: PlayerView) => {
        console.log('action', playerView);
        setPlayerView(playerView);
      });
    },
    [setPlayerView]
  );

  return runAction;
}
