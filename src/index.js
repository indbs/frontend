import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import {createStore, combineReducers} from 'redux';
import {user_behavior} from './reducers/user_reducer';

const initialState = {
  logged_in: false,
  user_name: ''
};

const store = createStore(
  user_behavior,
  initialState
);

store.subscribe(()=>console.log('state: ', store.getState()));

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();