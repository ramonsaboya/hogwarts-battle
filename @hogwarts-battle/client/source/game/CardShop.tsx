import React from 'react';
import PlayerCardDisplay from './PlayerCardDisplay';
import {PlayerCardsExternalState} from '@hogwarts-battle/common';

type Props = {
  playerCardsState: PlayerCardsExternalState;
};

export default function CardShop({playerCardsState}: Props) {
  return (
    <>
      {playerCardsState.availableCards.map(cardInstance => (
        <PlayerCardDisplay key={cardInstance.id} cardInstance={cardInstance} />
      ))}
    </>
  );
}
