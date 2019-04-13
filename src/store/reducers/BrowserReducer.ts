import {BrowserState, BrowserCard, Page, Loading} from '../../containers/Browser/types';
import { BaseAction, actionTypes } from '../sagas/actions';

const INTITIAL_STATE: BrowserState = {
  cards: {
    shows: {},
    pages: {},
    totalPages: {}
  },
  loading: { }
}

export default (state: BrowserState = INTITIAL_STATE, action: BaseAction): BrowserState =>  {
    switch(action.type) {
      case(actionTypes.LOADING_PORTAL):
        const portalLoading: Loading = {...state.loading};
        portalLoading['portal'] = true;
        return {...state, loading: portalLoading};
      case(actionTypes.LOADING_SHOWS_BY_GENRE):
        const showsByGenreLoading = {...state.loading};
        showsByGenreLoading[action.payload.key] = true;
        return {...state, loading: showsByGenreLoading};
      case(actionTypes.GET_PORTAL): 
        console.log(action.payload.content)
        let transformed: BrowserCard = {
          shows: {},
          pages: {},
          totalPages: {}
        };
        Object.keys(action.payload.content).reduce((transformed: BrowserCard, key: string) => {
            transformed.shows[key] = action.payload.content[key];
            transformed.pages[key] = 0;
            transformed.totalPages[key] = 0;
            return transformed;
        },  transformed);

        console.log(transformed)
        return { ...state, cards: transformed, loading: action.payload.loading}

      case(actionTypes.GET_SHOWS_BY_GENRE):
        console.log(action.payload)
        const updatedCards = {...state.cards.shows};
        updatedCards[action.payload.key] = [...updatedCards[action.payload.key], ...action.payload.cards.content];

        const updatedPages: Page = {...state.cards.pages};
        console.log(action.payload.key);
        console.log(updatedPages[action.payload.key]);
        updatedPages[action.payload.key] = action.payload.cards['number'];
        console.log(updatedPages[action.payload.key]);
        const updatedTotalPages = {...state.cards.totalPages};
        updatedTotalPages[action.payload.key] = action.payload.cards.totalPages;

        const updatedBrowserCard: BrowserCard = {
          shows: updatedCards,
          pages: updatedPages,
          totalPages: updatedTotalPages
        };

        const browserCardLoading = {...state.loading};
        browserCardLoading[action.payload.key] = false;

        console.log(updatedBrowserCard)
        return {...state, cards: updatedBrowserCard, loading: browserCardLoading}
        // return {...state, loading: browserCardLoading}
      default:
        return state;
    }
}