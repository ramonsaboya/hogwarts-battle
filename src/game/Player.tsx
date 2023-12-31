import React from 'react';
import {
  PlayerViewBasePlayer,
  PlayerViewOtherPlayer,
  PlayerViewSelfPlayer,
} from './player_view';
import PlayerHand from './PlayerHand';
import PlayerDiscardPile from './PlayerDiscardPile';
import './Players.css';

type Props = {
  player: PlayerViewBasePlayer;
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
  const otherPlayer = isOtherPlayer(player) ? (
    <>
      <div>playerID: {player.playerID}</div>
    </>
  ) : null;

  return (
    <div className="Player">
      {otherPlayer}
      <div>hero: {player.hero}</div>
      <div>health: {player.health}</div>
      <div>influence tokens: {player.influenceTokens}</div>
      <div>attack tokens: {player.attackTokens}</div>
      {selfPlayer}
    </div>
  );
}

function isSelfPlayer(
  player: PlayerViewBasePlayer
): player is PlayerViewSelfPlayer {
  return (player as PlayerViewSelfPlayer).hand !== undefined;
}

function isOtherPlayer(
  player: PlayerViewBasePlayer
): player is PlayerViewOtherPlayer {
  return (player as PlayerViewOtherPlayer).playerID !== undefined;
}