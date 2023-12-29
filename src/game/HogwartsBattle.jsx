import React from 'react';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import HogwartsBattleGame from './game';
import HogwartsBattleBoard from './board';

export default function HogwartsBattle({playerID, serverAddress}) {
  const App = Client({
    game: HogwartsBattleGame,
    board: HogwartsBattleBoard,
    multiplayer: SocketIO({ server: 'localhost:3000' }),
    debug: false,
  });
  
  return (<div style={{ padding: 50 }}>
    <App matchID="multi" playerID={playerID} />
    PlayerID: {playerID}
  </div>);
};