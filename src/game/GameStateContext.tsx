import React, {createContext, useContext, useMemo, useState} from 'react';
import {GameState} from './Game';

type GameStateSetter = React.Dispatch<React.SetStateAction<GameState>>;
interface GameStateManager {
  gameState: GameState;
  setGameState: GameStateSetter;
}

type GameStateContextType = GameStateManager | null;
const GameStateContext = createContext<GameStateContextType>(null);

const useGameStateValue = () => {
  const gameStateValue = useContext(GameStateContext);

  if (gameStateValue === null) {
    throw new Error(
      'useGameState has to be used within <GameStateContextProvider>'
    );
  }

  return gameStateValue;
};

export const useGameState = (): GameState => {
  const {gameState} = useGameStateValue();
  return gameState;
};

export const useSetGameState = (): GameStateSetter => {
  const {setGameState} = useGameStateValue();
  return setGameState;
};

export function GameStateContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [gameState, setGameState] = useState<GameState>({} as GameState);

  const value = useMemo<GameStateManager>(
    () => ({
      gameState,
      setGameState,
    }),
    [gameState]
  );
  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
}
