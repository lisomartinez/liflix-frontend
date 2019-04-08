import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import SlideButton from './SlideButton';
import { BrowserCard } from '../Browser/types';
import classes from './Slider.module.scss';
import { ShowCard as ShowCardType}  from '../../components/showCards/types';
import ShowCard   from '../../components/showCards/ShowCard';
import ContentButton from './ContentButton';
import Content from './content/Content';
import { AppState } from '../../store/reducers';
import { GET_SHOW_START } from '../../store/actions';
import { Show } from './content/types';


interface Props {
  key: string
  shows: BrowserCard
  fetchShow: Function
  show: Show
  rowName: string
}

interface State {
  hasNext?: boolean
  hasPrev?: boolean
  pos?: number
  style?: object
  width?: number
  windowSize?: number
  showContent?: boolean
  videoSize?: number
}

class Slider extends Component<Props, State> {
  private myRef = React.createRef<HTMLDivElement>();
  state = {
    hasNext: false,
    hasPrev: false,
    pos: 0,
    style: {},
    width: 0,
    windowSize: window.innerWidth,
    showContent: true,
    videoSize: 0
  }

  componentDidMount() {
    window.addEventListener('resize', this.calcSlider);
    this.calcSlider()
  }

  calcSlider = () => {
    const node = this.myRef.current;
    if (node) {
      const w = node.clientWidth;
      const children = node.children;
      if ((children.length * 210) > w) {
        this.setState({hasNext: true, width: (children.length * 210) - w , videoSize: w})
      } else {
        this.setState({hasNext: false, width: (children.length * 210) - w, videoSize: w })
      }
    }
  }


  renderShowCards = (): React.ReactNode => {
    return this.props.shows.cards.map((show: ShowCardType) => { 
      return (
        <ShowCard 
        classes={
          {
            Card: classes.Card,
            Info: classes.Info,
            ButtonContainer: classes.ButtonContainer,
            selected: ''
          }} 
        key={show.id} 
        show={show} 
        >
                <ContentButton row={this.props.rowName} card={show.id} onClick={this.showContent} />
        </ShowCard> 
        )
      });
    }
   
    showContent = (row: string, id: number) => {
      console.log(this.props.key)
      this.props.fetchShow(row, id);
      if (!this.state.showContent) {
        this.setState({showContent: true})
      }
    }


    next = () => {    
      const pos = this.state.pos;
      if (pos >= -this.state.width - 210) {
        this.setState({style : { transform: `translate3d(${pos - 210}px, 0, 0)`} , pos: pos - 210, hasPrev: true})
      }
    }

    prev = () => {
      const pos = this.state.pos;
      const newPos = pos + 210;  
      if (pos <= 0) {
        this.setState({style : { transform: `translate3d(${pos + 210}px, 0, 0)`} , pos: newPos})
      } 
      if (newPos === 0) {
        this.setState({hasPrev: false})
      }
    }
    render() {
    return (
      <div className={classes.Container}>
        {this.state.hasNext ? <SlideButton onClick={this.next} type='Next'></SlideButton> : null}
        {this.state.hasPrev ? <SlideButton onClick={this.prev} type='Prev'></SlideButton> : null}
        <div className={classes.Title}>
          {this.props.shows.genre}
        </div>
        <div className={classes.Row} style={this.state.style} ref={this.myRef}>
          {this.renderShowCards()}
        </div>
          {this.state.showContent ? <Content width={this.state.videoSize} show={this.props.show[this.props.rowName]}></Content> : null}
      </div>
    )
  }
};

const mapStateToProps = (state: AppState) => {
  return {
      show: state.shows.show
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
      fetchShow: (row: string, id: number) => dispatch({type: GET_SHOW_START, payload: {id: id, row: row}} )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);