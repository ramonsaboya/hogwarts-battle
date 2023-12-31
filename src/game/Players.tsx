import React from 'react';
import {PlayerViewBasePlayer} from './player_view';
import Player from './Player';
import './Players.css';

type Props = {
  players: PlayerViewBasePlayer[];
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
