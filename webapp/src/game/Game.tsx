import React, {useState} from 'react';
import {useSocket} from '../socket/SocketContext';
import {useGameState} from './GameStateContext';

export interface GameState {
  playerView: {
    activeVillains: string[];
  };
  players: number[];
  currentPlayer: number;
}

export default function Game() {
  const socket = useSocket();
  const gameState = useGameState();

  const [villainName, setVillainName] = useState('');

  const handleKillVillain = () => {
    socket.emit('kill villain', villainName);
  };

  return (
    <div>
      <div>{gameState.currentPlayer}</div>
      <input
        type="text"
        value={villainName}
        onChange={e => setVillainName(e.target.value)}
      />
      <button onClick={handleKillVillain}>Kill Villain</button>
    </div>
  );
}
