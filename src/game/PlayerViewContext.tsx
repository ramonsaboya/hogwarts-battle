import React, {createContext, useContext, useMemo, useState} from 'react';
import {
  PlayerView,
  SerializedPlayerView,
  deserializePlayerView,
} from './player_view';

interface PlayerViewManager {
  playerView: PlayerView;
  setPlayerView: (playerView: SerializedPlayerView) => void;
}

type PlayerViewContextType = PlayerViewManager | null;
const PlayerViewContext = createContext<PlayerViewContextType>(null);

const usePlayerViewValue = () => {
  const playerViewValue = useContext(PlayerViewContext);

  if (playerViewValue === null) {
    throw new Error(
      'usePlayerView has to be used within <PlayerViewContextProvider>'
    );
  }

  return playerViewValue;
};

export const usePlayerView = (): PlayerView => {
  const {playerView} = usePlayerViewValue();
  return playerView;
};

export const useSetPlayerView = (): ((
  playerView: SerializedPlayerView
) => void) => {
  const {setPlayerView} = usePlayerViewValue();
  return setPlayerView;
};

export function PlayerViewContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [playerView, setPlayerViewRaw] = useState<PlayerView>({} as PlayerView);

  const setPlayerView = (value: SerializedPlayerView) => {
    setPlayerViewRaw(deserializePlayerView(value));
  };

  const value = useMemo<PlayerViewManager>(
    () => ({
      playerView,
      setPlayerView,
    }),
    [playerView]
  );
  return (
    <PlayerViewContext.Provider value={value}>
      {children}
    </PlayerViewContext.Provider>
  );
}
