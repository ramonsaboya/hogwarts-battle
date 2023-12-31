import React from 'react';
import {PlayerViewPlayer} from './player_view';
import Player from './Player';
import './Players.css';

type Props = {
  players: PlayerViewPlayer[];
};

export default function Players({players}: Props) {
  return (
    <div className="Players">
      {players.map(player => (
        <Player key={player.hero} player={player} />
      ))}
    </div>
  );
}
