import React, {useEffect, useState} from 'react';
import {useGameState, useSetGameState} from './GameStateContext';
import {socket} from '../socket/socket';

export interface GameState {
  playerView: {
    activeVillains: string[];
  };
  players: number[];
  currentPlayer: number;
}

function Game() {
  const gameState = useGameState();

  const [villainName, setVillainName] = useState('');

  function handleKillVillain() {
    console.log('matando');
    socket.emit('vilain', villainName, (state: GameState) => {
      console.log('kill villain callback', state);
    });
  }

  return (
    <div>
      <div>ID: {gameState.currentPlayer}</div>
      <input
        type="text"
        value={villainName}
        onChange={e => setVillainName(e.target.value)}
      />
      <button onClick={handleKillVillain}>Kill Villain</button>
    </div>
  );
}

export default function GameWithSocket() {
  const setGameState = useSetGameState();

  useEffect(() => {
    socket.connect();

    function onConnect() {
      console.log('connected');
      socket.emit('message', 'user connected');
    }

    function onSyncEvent(gameState: GameState) {
      console.log('sync', gameState);
      setGameState(gameState);
    }

    socket.on('connect', onConnect);
    socket.on('sync', onSyncEvent);

    return () => {
      socket.off('sync', onSyncEvent);
      socket.off('connect', onConnect);
      socket.disconnect();
    };
  }, []);

  return <Game />;
}
