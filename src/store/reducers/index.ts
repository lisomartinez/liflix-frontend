import { combineReducers, Reducer}  from 'redux';
import showCardReducer from "./showCardReducer";
import BrowserReducer from './BrowserReducer';


export const rootReducer: Reducer = combineReducers({
    showCards: showCardReducer,
    browserCards: BrowserReducer
});


export type AppState = ReturnType<typeof rootReducer>;