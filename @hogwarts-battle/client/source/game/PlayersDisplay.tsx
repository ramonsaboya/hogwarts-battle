import React from 'react';
import PlayerDisplay from './PlayerDisplay';
import './Players.css';
import {ExternalPlayer} from '@hogwarts-battle/common';

type Props = {
  players: ExternalPlayer[];
};

export default function PlayersDisplay({players}: Props) {
  return (
    <div className="Players">
      {players.map(player => (
        <PlayerDisplay key={player.hero} player={player} />
      ))}
    </div>
  );
}
