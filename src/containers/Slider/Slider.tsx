import React, { Component } from 'react';
import SlideButton from './SlideButton';
import { BrowserCard } from '../Browser/types';
import classes from './Slider.module.scss';
import { ShowCard as ShowCardType}  from '../../components/showCards/types';
import ShowCard   from '../../components/showCards/ShowCard';


interface Props {
  key: string
  shows: BrowserCard
}

interface State {
  hasNext?: boolean
  hasPrev?: boolean
  pos?: number
  style?: object
  width?: number
  windowSize?: number
}

class Slider extends Component<Props, State> {
  private myRef = React.createRef<HTMLDivElement>();
  state = {
    hasNext: false,
    hasPrev: false,
    pos: 0,
    style: {},
    width: 0,
    windowSize: window.innerWidth
  }

  renderShowCards = (): React.ReactNode => {
    return this.props.shows.cards.map((show: ShowCardType) => { 
      return (
        <ShowCard class={classes.Card} key={show.id} show={show} ></ShowCard> 
        )
      });
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
          this.setState({hasNext: true, width: (children.length * 210) - w })
        } else {
          this.setState({hasNext: false, width: (children.length * 210) - w })
        }
      }
    }

    next = () => {
      
      const pos = this.state.pos;
      console.log(pos)
      console.log(this.state.width)
      // const newPos = pos - 210;

      if (pos >= -this.state.width - 210) {
        this.setState({style : { transform: `translate3d(${pos - 210}px, 0, 0)`} , pos: pos - 210, hasPrev: true})
      }
      
    }

    prev = () => {
      const pos = this.state.pos;
      console.log(pos)
      // const newPos = pos + 210;
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

      </div>
    )
  }
};

export default Slider;