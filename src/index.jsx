import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from "redux";
import App from "./app";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import reportWebVitals from './reportWebVitals';
//reducers
import reducers from "./store/reducers/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(promiseMiddleware, ReduxThunk)
));


ReactDOM.render(<App store={store}/>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
