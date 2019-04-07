import { actionTypes, BaseAction } from '../sagas/actions';
import { ShowCardState } from '../../components/showCards/types';

const INITIAL_STATE: ShowCardState = {
      content: [],
      loading: true,
    
  };


export default (state: ShowCardState = INITIAL_STATE, action: BaseAction): ShowCardState => {
    switch (action.type) {
        case(actionTypes.GET_SHOWS):
            return {...state, ...action.payload};
        case(actionTypes.GET_SHOWS_ERROR): {
            return {...state, loading: action.payload}
            }
        default:
            return state;
    }
}