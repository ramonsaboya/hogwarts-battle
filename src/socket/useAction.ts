import {useCallback} from 'react';
import {ClientToServerEvents, socket} from './socket';
import {useSetPlayerView} from '../game/PlayerViewContext';
import {PlayerView} from '../game/player_view';

type Action = Omit<ClientToServerEvents, 'join'>;
type ActionAndArg = {
  [K in keyof Action]: {action: K; args: Parameters<Action[K]>[0]};
}[keyof Action];

export function useAction() {
  const setPlayerView = useSetPlayerView();

  const runAction = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({action, args}: ActionAndArg) => {
      socket.emit(action, args, (playerView: PlayerView) => {
        console.log('action', playerView);
        setPlayerView(playerView);
      });
    },
    [setPlayerView]
  );

  return runAction;
}
