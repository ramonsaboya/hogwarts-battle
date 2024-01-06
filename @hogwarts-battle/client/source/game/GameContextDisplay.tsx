import React from 'react';
import {GameContext, TurnPhase} from '@hogwarts-battle/common';

type Props = {
  gameContext: GameContext;
  turnPhase: TurnPhase;
};

export default function GameContextDisplay({gameContext, turnPhase}: Props) {
  return (
    <div className="GameContextDisplay">
      <div>Turn: {gameContext.turn}</div>
      <div>Current player: {gameContext.currentPlayer}</div>
      <div>Player order: {gameContext.playerTurnOrder}</div>
      <div>Game phase: {turnPhase}</div>
    </div>
  );
}
