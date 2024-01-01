import React from 'react';
import {PlayerCard, HeroCard, HogwartsCard} from '@hogwarts-battle/common';

type Props = {
  card: PlayerCard;
};

export default function PlayerCardDisplay({card}: Props) {
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

function isHeroCard(card: PlayerCard): card is HeroCard {
  return (card as HeroCard).hero !== undefined;
}

function isHogwartsCard(card: PlayerCard): card is HogwartsCard {
  return (card as HogwartsCard).cost !== undefined;
}
