import React, { ReactNode } from 'react';
import { ShowCard as ShowCardType } from './types';
// import classes from './ShowCard.module.scss';
interface Props {
  show: ShowCardType
  classes: {
    Card: string
    Info: string
    ButtonContainer: string
    selected: string
  };
  children: ReactNode
}

const ShowCard: React.FunctionComponent<Props> = (props) => {
  const {image} = props.show;
  return (
    <div className={[props.classes.Card, props.classes.selected].join(' ')} >
      <img src={image} alt=""/>
      <div className={props.classes.Info}>
        <div className={props.classes.ButtonContainer}>
          {props.children}    
        </div>
      </div>
    </div>
  )
};

export default ShowCard;