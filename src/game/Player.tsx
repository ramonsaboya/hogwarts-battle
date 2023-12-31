import React from 'react';
import {PlayerViewPlayer, PlayerViewSelfPlayer} from './player_view';
import PlayerHand from './PlayerHand';
import PlayerDiscardPile from './PlayerDiscardPile';
import './Players.css';

type Props = {
  player: PlayerViewPlayer;
};

export default function Player({player}: Props) {
  const selfPlayer = isSelfPlayer(player) ? (
    <>
      <div>hand:</div>
      <PlayerHand hand={player.hand} />
      <div>discard:</div>
      <PlayerDiscardPile pile={player.discardPile} />
    </>
  ) : null;

  return (
    <div className="Player">
      <div>playerID: {player.playerID}</div>
      <div>hero: {player.hero}</div>
      <div>health: {player.health}</div>
      <div>influence tokens: {player.influenceTokens}</div>
      <div>attack tokens: {player.attackTokens}</div>
      {selfPlayer}
    </div>
  );
}

function isSelfPlayer(
  player: PlayerViewPlayer
): player is PlayerViewSelfPlayer {
  return (player as PlayerViewSelfPlayer).hand !== undefined;
}
