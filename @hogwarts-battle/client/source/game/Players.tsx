import React from 'react';
import Player from './Player';
import './Players.css';
import {PlayerViewPlayer} from '@hogwarts-battle/common/source/player_view';

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
