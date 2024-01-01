import {useCallback} from 'react';
import {ActionEmitter, getSocket} from './socket';
import {useSetPlayerView} from '../game/PlayerViewContext';
import {SerializedPlayerView} from '@hogwarts-battle/common/source/player_view';

export function useAction() {
  const setPlayerView = useSetPlayerView();

  const runAction = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({action, args}: ActionEmitter) => {
      console.log('runAction', action, args);
      getSocket().emit(action, args, (playerView: SerializedPlayerView) => {
        console.log('action', playerView);
        setPlayerView(playerView);
      });
    },
    [setPlayerView]
  );

  return runAction;
}
