import React, {Component} from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import SlideButton from './SlideButton';
import classes from './Slider.module.scss';
import { ShowCard as ShowCardType}  from '../../components/showCards/types';
import ShowCard   from '../../components/showCards/ShowCard';
import ContentButton from './ContentButton';
import Content from './content/Content';
import { AppState } from '../../store/reducers';
import { GET_SHOW_START } from '../../store/actions';
import { Show } from './content/types';
import {BrowserCardEntry, TotalPages, Page, Loading} from '../Browser/types';


interface Props {
  key: string
  shows: BrowserCardEntry
  fetchShow: Function
  fetchShowByGenre: Function
  show: Show
  rowName: string
  page: Page
  totalPages: TotalPages,
  loading: Loading
}

interface State {
  pos?: number
  style?: object
  start?: number
  windowSize?: number
  showContent?: boolean
  videoSize?: number
  end?: number
  actual?: number
  hasMorePages?: boolean
  hasNext?: boolean
  hasPrev?: boolean
}

class Slider extends Component<Props, State> {

  private myRef = React.createRef<HTMLDivElement>();

  state = {
    hasNext: false,
    hasPrev: false,
    hasMorePages: true,
    pos: 0,
    style: {},
    start: 0,
    windowSize: window.innerWidth,
    showContent: true,
    videoSize: 0,
    end: 0,
    actual: 0
  };

  componentDidMount() {
    window.addEventListener('resize', this.calcSlider);
    this.calcSlider()
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.shows.cards.length < this.props.shows.cards.length) {
      this.calcSlider();
    }
  }

  calcSlider = () => {
    const node = this.myRef.current;
    if (node) {
      const width = node.clientWidth;
      const children = node.children;
      const remaining = ((children.length * 210) - width) / 210;
      // console.log(width)
      // console.log(remaining)
      // const end = remaining / 10 > 0 ? Math.trunc(remaining) + 1  : remaining;
      const end = Math.trunc(remaining);
      // console.log(end)
      if ((children.length * 210) > width) {
        this.setState({
            videoSize: width,
            end: end,
            start: this.state.start,
            actual: this.state.actual
          })
      } else {
        this.setState({
          videoSize: width,
          end: end,
          start: this.state.start,
          actual: this.state.actual
        })
      }
    }
  };


  renderShowCards = (): React.ReactNode => {
    const cards: React.ReactNode[] = this.props.shows.cards.map((show: ShowCardType) => {
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
    if (this.props.loading[this.props.rowName]) {
      console.log('LOADING');
      cards.push(
      <ShowCard
          classes={
            {
              Card: classes.SkeletonCard,
              Info: classes.SkeletonSpinner,
              ButtonContainer: classes.ButtonContainer,
              selected: ''
            }}
          key={'skeleton'}
          show={{
            id: -1,
            name: 'skeleton',
            image: 'skeleton',
            rating: 0,
            seasons: 0
          }}

      ><ContentButton row={this.props.rowName} card={-1} onClick={this.showContent} /></ShowCard>
      );
    }
    return cards;

  };
   
    showContent = (row: string, id: number) => {
      console.log(this.props.key)
      this.props.fetchShow(row, id);
      if (!this.state.showContent) {
        this.setState({showContent: true})
      }
    };


    next = () => {    
      console.log("---NEXT---")
      console.log(`START: ${this.state.start}`)
      console.log(`END: ${this.state.end}`)
      if (this.hasNext()) {
        this.moveToRight(this.state.pos);
      }
      if (this.isLastOneCard()) {
        this.fetchShow();
      }
      if (this.state.hasMorePages) {
        this.showNewPage();
      }
      console.log(`ACTUAL: ${this.state.actual}`)
    };

  private showNewPage() {
    this.calcSlider();
    if (this.props.page[this.props.rowName] > 0) {
      this.setState({start: this.state.start - 1})
    }
  }

  private fetchShow() {
    const pages = this.props.totalPages[this.props.rowName];
    const page = this.props.page[this.props.rowName] + 1;
    this.props.fetchShowByGenre(this.props.rowName, page, 10)
    this.setState({hasMorePages: pages < this.props.totalPages[this.props.rowName]})
  }

  prev = () => {
      console.log("---PREV---")
      console.log(`START: ${this.state.start}`)
      console.log(`END: ${this.state.end}`)
      console.log(`ACTUAL: ${this.state.actual}`)

      if (this.hasPrev()) {
        this.moveToLeft(this.state.pos);
      } 
    };

  private isLastOneCard() {
    return this.state.actual === this.state.end;
  }

  private moveToLeft(pos: number) {
    this.setState({
       style: { transform: `translate3d(${pos + 210}px, 0, 0)` },
        pos: pos + 210, 
        actual: this.state.actual - 1 });
  }

  private hasPrev() {
    return this.state.actual >= this.state.start;
  }

  private moveToRight(pos: number) {
    this.setState({ 
      style: { transform: `translate3d(${pos - 210}px, 0, 0)` }, 
      pos: pos - 210, 
      actual: this.state.actual + 1
    });
  }

  hasNext() {
    return this.state.actual <= this.state.end;
  }

    render() {
      console.log(`ACTUAL RENDER: ${this.state.actual}`)

      return (
      <div className={classes.Container}>
        {this.hasNext() ? <SlideButton onClick={this.next} type='Next'></SlideButton> : null}
        {this.hasPrev() ? <SlideButton onClick={this.prev} type='Prev'></SlideButton> : null}
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
      loading: state.browserCards.loading,
      show: state.shows.show,
      page: state.browserCards.cards.pages,
      totalPages: state.browserCards.cards.totalPages
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
      fetchShow: (row: string, id: number) => dispatch({type: GET_SHOW_START, payload: {id: id, row: row}} )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);