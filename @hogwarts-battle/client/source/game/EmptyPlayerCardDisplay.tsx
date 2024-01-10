import React from 'react';
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
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
});

export default function EmptyPlayerCardDisplay() {
  const classes = useStyles();

  return <button className={classes.container} disabled={true} />;
}
