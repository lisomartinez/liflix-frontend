import * as React from 'react';
import ReactDOM from 'react-dom';
import { createStore, Store, applyMiddleware, compose} from "redux";
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'

import App from './App';
import { rootReducer } from './store/reducers/index';
import { showsRoot }  from "./store/sagas";


const sagaMiddleware = createSagaMiddleware();
const store: Store = createStore(rootReducer,   
  compose(
    applyMiddleware(sagaMiddleware),
    window['__REDUX_DEVTOOLS_EXTENSION__'] ? window['__REDUX_DEVTOOLS_EXTENSION__']() : compose)
);

sagaMiddleware.run(showsRoot);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#root'));