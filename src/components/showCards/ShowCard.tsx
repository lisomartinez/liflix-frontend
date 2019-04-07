import React from 'react';
import { ShowCard as ShowCardType } from './types';
import classes from './ShowCard.module.scss';
interface Props {
  show: ShowCardType
  class: string;
}

const ShowCard: React.FunctionComponent<Props> = (props) => {
  const {name, image, rating, seasons} = props.show;
  return (
    <div className={props.class} >
      <img src={image} alt=""/>
      <div className={classes.Info}>
        <div className={classes.Name}>{name}</div>
        <div className={classes.Seasons}>{seasons} seasons</div>
        <div className={classes.Rating}>rating: {rating}</div>    
      </div>
    </div>
  )
};

export default ShowCard;