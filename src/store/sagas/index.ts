import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import axios from 'axios';
import { actionTypes, BaseAction } from './actions';
import { GET_SHOWS_START, GET_PORTAL_START, GET_SHOW_START, GET_SHOW_BY_GENRE_START } from '../actions/index';
import { ShowCardState } from '../../components/showCards/types'
import config from '../../config'

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
  return axios.get(`${config.LIFLIX}shows/cards`);
};


function* watchFetchPortl() {
  yield takeEvery(GET_PORTAL_START, callFetchPortal);
}

function* callFetchPortal() {
  yield put({type: actionTypes.LOADING_PORTAL, payload: true})
  const response = yield call(fetchPortal);
  yield put({
    type: actionTypes.GET_PORTAL,
    payload: {content: response.data, loading: false}
  })
}

const fetchPortal = () => {
  return axios.get(`${config.LIFLIX}browser/portal`);
}


function* watchGetShow() {
  yield takeEvery(GET_SHOW_START, (action: BaseAction) => callGetShow(action));
}


function* callGetShow(action: BaseAction) {
  yield put ({type: actionTypes.LOADING_SHOWS_BY_GENRE, payload: {key: action.payload.row}});
  const response = yield call(fetchShow, action.payload.id);
  yield put({
    type: actionTypes.GET_SHOW,
    payload: { key: action.payload.row, value: response.data }}
  )
}

const fetchShow = async (id: number) => { 
  const response = await axios.get(`${config.LIFLIX}shows/${id}`)
  return response;
};

function* watchGetShowByGenre() {
  yield takeEvery(GET_SHOW_BY_GENRE_START, (action: BaseAction) => callGetShowByGenre(action))
}

function* callGetShowByGenre(action: BaseAction) {
  const response = yield call(fetchShowsByGenre, action.payload);
  yield put({
    type: actionTypes.GET_SHOWS_BY_GENRE,
    payload: {
      key: action.payload.genre,
      cards: response.data
    }
  })
}

interface Params {
  genre: string
  page: number
  size: number
}

const fetchShowsByGenre = async (params: Params) => { 
  console.log(`${config.LIFLIX}genres/${params.genre}?page=${params.page}&size=${params.size}`)
  return   await axios.get(`${config.LIFLIX}genres/${params.genre}?page=${params.page}&size=${params.size}`) 
};


export const showsRoot = function* showsRoot() {
  yield all([
    fork(watchFetchShowCards),
    fork(watchFetchPortl),
    fork(watchGetShow),
    fork(watchGetShowByGenre)
  ])
};