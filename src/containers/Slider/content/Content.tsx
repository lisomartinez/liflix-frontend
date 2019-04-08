import React from 'react';
import classes from './Content.module.scss';
import { Show } from './types';
import CancelButton from './CancelButton';
// import CancelIcon from './CancelIcon';

interface Props {
  width: number
  show: Show

}

const getContent = (show: Show) => {
  let cont = null;

if (show !== undefined) {
  cont = <div className={classes.content}>
  <div className={classes.background}>
    <div className={classes.left}> 
      <div className={classes.video}></div>   
      <div className={classes.container}>
        <div className={classes.Title}>{show.name}</div>
        <div className={classes.Lanaguage}>
          <span className={classes.Tag}>
            Language:
          </span>  
          {show.language}
        </div>
        <div className={classes.Status}>
          <span className={classes.Tag}>
            Status:
          </span> {show.status}
        </div>
        <div className={classes.Genres}>
          GENRES
        </div>
        <div className={classes.Runtime}>
          <span className={classes.Tag}>
            Runtime: 
          </span>
          {show.runtime}
        </div>
        <div className={classes.Rating}>
          <span className={classes.Tag}>
            Rating: 
          </span>
          {show.rating}
        </div>
         <a className={classes.OfficialSite} href={show.officialSite}>
          Official Site
        </a>
        <div className={classes.Schedule}>SCHEDULE</div>
        <a className={classes.Imdb}href={show.imdb}>IMDB</a>
        <div className={classes.Summary}>
          <span className={classes.Tag}>Summary: </span>
        {show.summary}
        </div>
      </div>
    </div>
    <div className={classes.right}>
    <div className={classes.videoContainer}>
      <iframe src="https://www.imdb.com/videoembed/vi17412889"   height='580x' width='750px' frameBorder='0'></iframe>
    </div>
    <div className={classes.Cancel}><CancelButton></CancelButton></div>
    </div>
  </div>

</div> 
}
return cont;
};

const Content: React.FC<Props> = (props) => {
  
  return (
    <div>{getContent(props.show)}</div>
  );
};

export default Content;