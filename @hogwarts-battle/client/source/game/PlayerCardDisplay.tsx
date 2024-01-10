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
    justifyContent: 'start',
    alignItems: 'center',
    height: '150px',
    width: '100px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    border: '1px solid white',
    backgroundColor: 'transparent',
    color: 'white',
    cursor: 'pointer',
    '&:enabled:hover': {
      backgroundColor: 'blue',
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
  type: {
    marginTop: '5px',
  },
  name: {
    marginTop: '10px',
    textWrap: 'nowrap',
    maxWidth: '100%',
    minHeight: '25px',
    textOverflow: 'ellipsis',
    maxLines: '1',
    overflow: 'clip',
  },
  description: {
    textAlign: 'start',
    overflow: 'scroll',
    marginBottom: '25px',
  },
  cost: {
    position: 'absolute',
    bottom: '5px',
    right: '5px',
  },
  hero: {
    marginTop: '10px',
    position: 'absolute',
    bottom: '5px',
  },
});

type Props = {
  cardInstance: PlayerCardInstance;
  onClick?: () => void;
  disabled?: boolean;
};

export default function PlayerCardDisplay({
  cardInstance,
  onClick,
  disabled = false,
}: Props) {
  const classes = useStyles();
  const {card} = cardInstance;

  const heroCard = isHeroCard(card) ? (
    <div className={classes.hero}>{card.hero}</div>
  ) : null;
  const hogwartsCard = isHogwartsCard(card) ? (
    <div className={classes.cost}>{card.cost}</div>
  ) : null;

  return (
    <button className={classes.container} onClick={onClick} disabled={disabled}>
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
