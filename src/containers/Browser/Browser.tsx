import React, {Component, ReactNode} from 'react';
import { connect } from 'react-redux';
import {Dispatch} from "redux";
import classes from './Browser.module.scss';
import {BaseAction} from "../../store/sagas/actions";
import { GET_PORTAL_START } from '../../store/actions';
import { AppState } from '../../store/reducers';
import { BrowserCard } from './types';
import Slider from '../Slider/Slider';

interface Props {
    fetchPortal: Function,
    portal: BrowserCard[],
    isPortalLoading: boolean
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
      if (this.props.isPortalLoading === false ) {
        portal = Object.keys(this.props.portal).map((key: string) => { 
          const card: BrowserCard = {
            genre: key,
            cards: this.props.portal[key]
          };
       return ( <Slider key={key} shows={card} />)
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
        portal: state.browserCards.cards,
        isPortalLoading: state.browserCards.loading
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchPortal: () => dispatch(GET_PORTAL)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Browser);