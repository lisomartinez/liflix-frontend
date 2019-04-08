import React from 'react';
import IconArrow from './IconArrow';
import classes from './ContentButton.module.scss';

interface Props {
  onClick: Function
  card: number
  row: string
}

  const handleClick = (onClick: Function, row:string, card: number) => {
    onClick(row, card);
  }

const ContentButton: React.FC<Props> = (props) => (
  <button className={classes.Button} onClick={() => handleClick(props.onClick, props.row, props.card)}>
  <span>
    <IconArrow />
  </span>
</button>
);

export default ContentButton;