import { actionTypes, BaseAction } from '../sagas/actions';
import { ShowState } from '../../containers/Slider/content/types';


const INITIAL_STATE: ShowState = {
  show: {}
};

export default (state: ShowState = INITIAL_STATE, action: BaseAction) => {
  switch(action.type) {
    case(actionTypes.GET_SHOW):
      const sta = {...state, show: {...state.show, [action.payload.key]: action.payload.value}};
      console.log(sta)
      return sta;
    default:
      return state;
  }
}