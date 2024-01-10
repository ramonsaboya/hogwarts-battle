import React from 'react';
import {usePlayerView} from './PlayerViewContext';

export default function GameContextDisplay() {
  const {gameContext, gameStateView} = usePlayerView();

  if (gameContext.playerTurnOrder === undefined) {
    return null;
  }

  const allPlayers = [
    ...gameStateView.players.otherPlayers,
    gameStateView.players.selfPlayer,
  ];
  const currentPlayer = allPlayers.find(
    player => player.playerID === gameContext.currentPlayer
  )!;

  const playerOrder = gameContext.playerTurnOrder.map(playerID => {
    const player = allPlayers.find(player => player.playerID === playerID)!;
    return player.playerName;
  });

  return (
    <div className="GameContextDisplay">
      <div>Turn: {gameContext.turn}</div>
      <div>Current player: {currentPlayer.playerName}</div>
      <div>Player order: {playerOrder.join(' -> ')}</div>
      <div>Game phase: {gameStateView.turnPhase}</div>
    </div>
  );
}
