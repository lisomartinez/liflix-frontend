import React, {Component, ReactNode} from 'react';
import { connect } from 'react-redux';
import {Dispatch} from "redux";
import classes from './Browser.module.scss';
import {BaseAction} from "../../store/sagas/actions";
import { ShowCard as ShowCardType} from '../../components/showCards/types';
import { GET_SHOWS_START, GET_PORTAL_START } from '../../store/actions';
import ShowCard from '../../components/showCards/ShowCard';
import { AppState } from '../../store/reducers';
import { BrowserCard } from './types';

interface Props {
    shows: ShowCardType[]
    areCardLoading: boolean
    fetchShows: Function,
    fetchPortal: Function,
    portal: BrowserCard[],
    isPortalLoading: boolean
}

const GET_SHOWS: BaseAction = {
    type: GET_SHOWS_START,
    payload: {}
};

const GET_PORTAL: BaseAction = {
    type: GET_PORTAL_START,
    payload: {}
}

class Browser extends Component<Props, {}> {
    componentDidMount()
    {
        this.props.fetchShows();
        this.props.fetchPortal();
    }
    renderShowCards = () => {
      let cards: ReactNode = (<div>LOADING</div>);
      if (this.props.areCardLoading === false) {
        cards = this.props.shows.map((show: ShowCardType) => <ShowCard key={show.id} show={show}></ShowCard>)
      }
      return cards;
    }

    render() {
      console.log(this.props.portal)
        return (
            <div className={classes.Browser}>
              BROWSER
              <div className={classes.Cards}>
                {this.renderShowCards()}
              </div>
            </div>
        );
    }
}



const mapStateToProps = (state: AppState) => {
  // console.log(state)
    return {
        shows: state.showCards.content,
        areCardLoading: state.showCards.loading,
        portal: state.browserCards.cards,
        isPortalLoading: state.browserCards.loading
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchShows: () => dispatch(GET_SHOWS),
        fetchPortal: () => dispatch(GET_PORTAL)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Browser);