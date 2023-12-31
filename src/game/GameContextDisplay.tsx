import React from 'react';
import {GameContext} from '../../server/game_context';
import './GameContextDisplay.css';

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
