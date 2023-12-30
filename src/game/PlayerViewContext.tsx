import React, {createContext, useContext, useMemo, useState} from 'react';
import {PlayerView} from './player_view';

type PlayerViewSetter = React.Dispatch<React.SetStateAction<PlayerView>>;
interface PlayerViewManager {
  PlayerView: PlayerView;
  setPlayerView: PlayerViewSetter;
}

type PlayerViewContextType = PlayerViewManager | null;
const PlayerViewContext = createContext<PlayerViewContextType>(null);

const usePlayerViewValue = () => {
  const PlayerViewValue = useContext(PlayerViewContext);

  if (PlayerViewValue === null) {
    throw new Error(
      'usePlayerView has to be used within <PlayerViewContextProvider>'
    );
  }

  return PlayerViewValue;
};

export const usePlayerView = (): PlayerView => {
  const {PlayerView} = usePlayerViewValue();
  return PlayerView;
};

export const useSetPlayerView = (): PlayerViewSetter => {
  const {setPlayerView} = usePlayerViewValue();
  return setPlayerView;
};

export function PlayerViewContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [PlayerView, setPlayerView] = useState<PlayerView>({} as PlayerView);

  const value = useMemo<PlayerViewManager>(
    () => ({
      PlayerView,
      setPlayerView,
    }),
    [PlayerView]
  );
  return (
    <PlayerViewContext.Provider value={value}>
      {children}
    </PlayerViewContext.Provider>
  );
}
