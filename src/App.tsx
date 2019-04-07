import * as React from 'react';
import styles from './App.module.scss';
import NavBar from "./containers/NavBar/NavBar";
import {BrowserRouter, Route} from 'react-router-dom';
import Browser from "./containers/Browser/Browser";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div className={styles.layout}>
                    <NavBar/>
                </div>
                <Route path="/" exact component={Browser}></Route>
            </BrowserRouter>
        </div>

    );
};
export default App;