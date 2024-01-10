import React from 'react';
import CardShop from './CardShop';
import {createUseStyles} from 'react-jss';
import MainBoard from './MainBoard';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flex: 1,
  },
});

export default function GameBoard() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <MainBoard />
      <CardShop />
    </div>
  );
}
