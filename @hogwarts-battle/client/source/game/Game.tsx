import React from 'react';
import {usePlayerView} from './PlayerViewContext';
import {useAction} from '../socket/useAction';
import PlayersDisplay from './PlayersDisplay';
import GameContextDisplay from './GameContextDisplay';
import LocationsDisplay from './LocationsDisplay';
import CardShop from './CardShop';
import RequiredPlayerInputDisplay from './RequiredPlayerInputDisplay';
import VillainsDisplay from './VillainsDisplay';

export default function Game() {
  const playerView = usePlayerView();
  const runAction = useAction();
  const gameStateView = playerView.gameStateView;

  const handleRevealDarkArtsCard = () => {
    runAction({action: 'revealDarkArtsEvent', args: {}});
  };

  const handleEndTurn = () => {
    runAction({action: 'endTurn', args: {}});
  };

  if (gameStateView.villains === undefined) {
    return <div>loading...</div>;
  }

  if (gameStateView.players.selfPlayer.requiredPlayerInput !== null) {
    return <RequiredPlayerInputDisplay playerView={playerView} />;
  }

  return (
    <div>
      <GameContextDisplay
        gameContext={playerView.gameContext}
        turnPhase={gameStateView.turnPhase}
      />
      <PlayersDisplay
        players={[
          gameStateView.players.selfPlayer,
          ...gameStateView.players.otherPlayers,
        ]}
      />
      <LocationsDisplay locationsState={gameStateView.locations} />
      <CardShop playerCardsState={gameStateView.playerCards} />
      <div>Dark Arts Event: {gameStateView.darkArtsEvents.active?.name}</div>
      <VillainsDisplay
        villainsState={gameStateView.villains}
        selfPlayer={gameStateView.players.selfPlayer}
      />
      <button onClick={handleRevealDarkArtsCard}>Reveal Dark Arts Card</button>
      <button onClick={handleEndTurn}>End Turn</button>
    </div>
  );
}
