import { BrowserState } from '../../containers/Browser/types';
import { BaseAction, actionTypes } from '../sagas/actions';

const INTITIAL_STATE: BrowserState = {
  cards: [],
  loading: true
}

export default (state: BrowserState = INTITIAL_STATE, action: BaseAction): BrowserState =>  {
    switch(action.type) {
      case(actionTypes.GET_PORTAL): 
      console.log(action.payload)
        return { ...state, cards: action.payload, loading: false}
      default:
        return state;
    }
}