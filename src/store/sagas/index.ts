import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import axios from 'axios';
import { actionTypes } from './actions';
import { GET_SHOWS_START, GET_PORTAL_START } from '../actions/index';
import { ShowCardState } from '../../components/showCards/types'

function* watchFetchShowCards() {
  yield takeEvery(GET_SHOWS_START, callFetchShowCards);
}

export function* callFetchShowCards() {
  const  response  = yield call(fetchShowCards);
  if ( response.status !== 200 ) {
    yield put({
      type: actionTypes.GET_SHOWS_ERROR,
      payload: {
        loading: true
      }
    })
  } else {
    const data = response.data;
    const showCards: ShowCardState = {
      content: data.content,
      empty: data.empty,
      first: data.first,
      last: data.last,
      number: data.number,
      numberOfElements: data.numberOfElements,
      size: data.size,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      loading: false,
    }
    yield put({
      type: actionTypes.GET_SHOWS,
      payload: showCards
    })
  }
}




const fetchShowCards = () => {
  return axios.get('http://localhost:8080/shows/cards');
};


function* watchFetchPortl() {
  yield takeEvery(GET_PORTAL_START, callFetchPortal);
}

function* callFetchPortal() {
  const response = yield call(fetchPortal);
  yield put({
    type: actionTypes.GET_PORTAL,
    payload: response.data
  })
}

const fetchPortal = () => {
  return axios.get('http://localhost:8080/browser/portal');
}

export const showsRoot = function* showsRoot() {
  yield all([
    fork(watchFetchShowCards),
    fork(watchFetchPortl)
  ])
};