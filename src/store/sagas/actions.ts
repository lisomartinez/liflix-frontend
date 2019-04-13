export const actionTypes = {
    GET_SHOWS: 'GET_SHOWS',
    GET_SHOW: 'GET_SHOW',
    GET_SHOWS_ERROR: 'GET_SHOWS_ERROR',
    GET_PORTAL: 'GET_PORTAL',
    GET_SHOWS_BY_GENRE: 'GET_SHOWS_BY_GENRE',
    LOADING_PORTAL: 'LOADING_PORTAL',
    LOADING_SHOWS_BY_GENRE: 'LOADING_SHOWS_BY_GENRE'
};

export interface BaseAction {
    type: string,
    payload: any;
}