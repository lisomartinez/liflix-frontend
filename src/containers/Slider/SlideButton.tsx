import React from 'react';
import IconArrowDown from './IconArrow';
import classes from './SlideButton.module.scss';

interface Props {
  type: string
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SlideButton: React.FC<Props> = (props) => {
  const direction = props.type === "Next" ? classes.Next : classes.Prev;
  return (
  <button onClick={props.onClick} className={[classes.Button, direction].join(' ')}>
    <span>
      <IconArrowDown />
    </span>
  </button>
  )
};

export default SlideButton;