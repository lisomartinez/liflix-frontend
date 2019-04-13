import React, {Component, ReactNode} from 'react';
import { connect } from 'react-redux';
import {Dispatch} from "redux";
import classes from './Browser.module.scss';
import {BaseAction} from "../../store/sagas/actions";
import { GET_PORTAL_START, GET_SHOW_BY_GENRE_START} from '../../store/actions';
import { AppState } from '../../store/reducers';
import {BrowserCard, BrowserCardEntry, Loading} from './types';
import Slider from '../Slider/Slider';

interface Props {
    fetchPortal: Function,
    fetchShowsByGenre: Function,
    portal: BrowserCard,
    loading: Loading
}


const GET_PORTAL: BaseAction = {
    type: GET_PORTAL_START,
    payload: {}
}

class Browser extends Component<Props, {}> {
    componentDidMount()
    {
        this.props.fetchPortal();
    }

    renderRows = () => {
      let portal: ReactNode = (<div>LOADING</div>);
      if (!this.props.loading['portal'] ) {
        portal = Object.keys(this.props.portal).map((key: string) => { 
          const card: BrowserCardEntry = {
            genre: key,
            cards: this.props.portal[key]
          };
       return ( <Slider key={key} shows={card} rowName={key} fetchShowByGenre={this.props.fetchShowsByGenre}/>)
      });
    }
    return portal;
  }

    render() {
        return (
            <div className={classes.Browser}>
                {this.renderRows()}
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        portal: state.browserCards.cards.shows,
        loading: state.browserCards.loading
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchPortal: () => dispatch(GET_PORTAL),
        fetchShowsByGenre: (genre: string, page: number, size: number) => dispatch({
            type: GET_SHOW_BY_GENRE_START,
            payload: {
                genre: genre,
                page: page,
                size: size
            }
        })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Browser);