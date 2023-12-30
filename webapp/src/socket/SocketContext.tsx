import React, {createContext, useContext, useEffect, useRef} from 'react';
import {Socket, io} from 'socket.io-client';
import {useSetGameState} from '../game/GameStateContext';
import {GameState} from '../game/Game';

const SocketContext = createContext<Socket>({} as Socket);

export const useSocket = () => {
  const socket = useContext(SocketContext);

  if (socket === null) {
    throw new Error('useSocket has to be used within <SocketContextProvider>');
  }

  return socket;
};

export function SocketContextProvider({children}: {children: React.ReactNode}) {
  const socketRef = useRef<Socket>({} as Socket);
  const setGameState = useSetGameState();

  console.log('a');
  useEffect(() => {
    const socket = io('http://localhost:4030');

    socket.on('connect', () => {
      console.log('connected');
      socket.emit('message', 'Hello from client!');
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    socket.on('sync', (data: GameState) => {
      console.log('sync', data);
      setGameState(data);
    });

    socketRef.current = socket;

    return () => {
      socket.off('sync');
      socket.off('disconnected');
      socket.off('connect');
      socket.disconnect();
    };
  }, [setGameState]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
}
