import React from 'react';
import {Card, HeroCard, HogwartsCard} from '../../server/player/player_state';

type Props = {
  card: Card;
};

export default function PlayerHand({card}: Props) {
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

function isHeroCard(card: Card): card is HeroCard {
  return (card as HeroCard).hero !== undefined;
}

function isHogwartsCard(card: Card): card is HogwartsCard {
  return (card as HogwartsCard).cost !== undefined;
}
