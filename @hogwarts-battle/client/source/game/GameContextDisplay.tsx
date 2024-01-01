import React from 'react';
import './GameContextDisplay.css';
import {GameContext} from '@hogwarts-battle/common';

type Props = {
  gameContext: GameContext;
};

export default function GameContextDisplay({gameContext}: Props) {
  return (
    <div className="GameContextDisplay">
      <div>Turn: {gameContext.turn}</div>
      <div>Current player: {gameContext.currentPlayer}</div>
      <div>Player order: {gameContext.playerTurnOrder}</div>
    </div>
  );
}
