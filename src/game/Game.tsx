import React, {useState} from 'react';
import {useGameState} from './GameStateContext';
import {socket} from '../socket/socket';
import {GameState} from './GameState';

export default function Game() {
  const gameState = useGameState();
  const [villainName, setVillainName] = useState('');

  if (gameState.gameContext === undefined) {
    return <div>loading...</div>;
  }

  function handleKillVillain() {
    socket.emit('vilain', villainName, (state: GameState) => {
      console.log('kill villain callback', state);
    });
  }

  return (
    <div>
      <div>ID: {gameState.gameContext.currentPlayer}</div>
      <input
        type="text"
        value={villainName}
        onChange={e => setVillainName(e.target.value)}
      />
      <button onClick={handleKillVillain}>Kill Villain</button>
    </div>
  );
}
