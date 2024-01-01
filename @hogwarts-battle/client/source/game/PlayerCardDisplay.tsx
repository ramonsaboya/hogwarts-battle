import React from 'react';
import {
  PlayerCardInstance,
  PlayerCard,
  PlayerHeroCard,
  PlayerHogwartsCard,
} from '@hogwarts-battle/common';

type Props = {
  cardInstance: PlayerCardInstance;
};

export default function PlayerCardDisplay({cardInstance}: Props) {
  const {card} = cardInstance;

  const heroCard = isHeroCard(card) ? (
    <>
      <div>hero: {card.hero}</div>
    </>
  ) : null;
  const hogwartsCard = isHogwartsCard(card) ? (
    <>
      <div>cost: {card.cost}</div>
    </>
  ) : null;

  return (
    <>
      <div>name: {card.name}</div>
      <div>type: {card.type}</div>
      {heroCard}
      {hogwartsCard}
    </>
  );
}

function isHeroCard(card: PlayerCard): card is PlayerHeroCard {
  return (card as PlayerHeroCard).hero !== undefined;
}

function isHogwartsCard(card: PlayerCard): card is PlayerHogwartsCard {
  return (card as PlayerHogwartsCard).cost !== undefined;
}
