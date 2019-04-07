export const actionTypes = {
    GET_SHOWS: 'GET_SHOWS',
    GET_SHOW: 'GET_SHOW_ACTION',
    GET_SHOWS_ERROR: 'GET_SHOWS_ERROR',
    GET_PORTAL: 'GET_PORTAL'
};

export interface BaseAction {
    type: string,
    payload: any;
}