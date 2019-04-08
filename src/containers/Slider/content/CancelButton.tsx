import React from 'react';
import CancelIcon from './CancelIcon';
import classes from './CancelButton.module.scss';

const CancelButton: React.FC<{}> = (props) => (
  <button className={classes.Button}>
    <span>
      <CancelIcon />
    </span>
  </button>
);

export default CancelButton;