import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import configureMockStore from "redux-mock-store";
import reducerObject from "./config/mockStore";
import thunk from 'redux-thunk';
const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
const store = mockStore(reducerObject);



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App store={store} />, div);
  
});