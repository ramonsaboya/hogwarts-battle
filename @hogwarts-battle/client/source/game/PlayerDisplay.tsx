import React from 'react';
import PlayerHandDisplay from './PlayerHandDisplay';
import PlayerDiscardPileDisplay from './PlayerDiscardPileDisplay';
import './Players.css';
import {ExternalPlayer, SelfExternalPlayer} from '@hogwarts-battle/common';

type Props = {
  player: ExternalPlayer;
};

export default function PlayerDisplay({player}: Props) {
  const selfPlayer = isSelfPlayer(player) ? (
    <>
      <div>hand:</div>
      <PlayerHandDisplay hand={player.hand} />
      <div>discard:</div>
      <PlayerDiscardPileDisplay pile={player.discardPile} />
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

function isSelfPlayer(player: ExternalPlayer): player is SelfExternalPlayer {
  return (player as SelfExternalPlayer).hand !== undefined;
}
