import React from 'react';
import {createUseStyles} from 'react-jss';
import {useAction} from '../socket/useAction';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  darkArtsEventCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '200px',
    height: '150px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    border: '1px solid white',
    backgroundColor: 'transparent',
    color: 'white',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'blue',
    },
    padding: '10px',
  },
});

export default function DarkArtsEventStack() {
  const classes = useStyles();
  const runAction = useAction();

  return (
    <div className={classes.container}>
      <button
        className={classes.darkArtsEventCard}
        onClick={() => runAction({action: 'revealDarkArtsEvent', args: {}})}
      />
    </div>
  );
}
