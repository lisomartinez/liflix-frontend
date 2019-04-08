import { combineReducers, Reducer}  from 'redux';
import showCardReducer from "./showCardReducer";
import BrowserReducer from './BrowserReducer';
import ShowReducer from './ShowReducer';


export const rootReducer: Reducer = combineReducers({
    showCards: showCardReducer,
    browserCards: BrowserReducer,
    shows: ShowReducer
});


export type AppState = ReturnType<typeof rootReducer>;