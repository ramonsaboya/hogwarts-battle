import React from 'react';
import {
  PlayerCardInstance,
  PlayerCard,
  PlayerHeroCard,
  PlayerHogwartsCard,
} from '@hogwarts-battle/common';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
    alignItems: 'center',
    height: '150px',
    width: '100px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    border: '1px solid white',
    backgroundColor: 'transparent',
    color: 'white',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'blue',
    },
  },
  type: {},
  name: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  description: {
    textAlign: 'start',
  },
  cost: {
    position: 'absolute',
    bottom: '5px',
    right: '5px',
  },
  hero: {
    marginTop: '10px',
  },
});

type Props = {
  cardInstance: PlayerCardInstance;
  onClick?: () => void;
};

export default function PlayerCardDisplay({cardInstance, onClick}: Props) {
  const classes = useStyles();
  const {card} = cardInstance;

  const heroCard = isHeroCard(card) ? (
    <div className={classes.hero}>{card.hero}</div>
  ) : null;
  const hogwartsCard = isHogwartsCard(card) ? (
    <div className={classes.cost}>{card.cost}</div>
  ) : null;

  return (
    <button className={classes.container} onClick={onClick}>
      <div className={classes.type}>{card.type}</div>
      <div className={classes.name}>{card.name}</div>
      <div className={classes.description}>{card.description}</div>
      {heroCard}
      {hogwartsCard}
    </button>
  );
}

function isHeroCard(card: PlayerCard): card is PlayerHeroCard {
  return (card as PlayerHeroCard).hero !== undefined;
}

function isHogwartsCard(card: PlayerCard): card is PlayerHogwartsCard {
  return (card as PlayerHogwartsCard).cost !== undefined;
}
