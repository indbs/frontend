import {createStore, combineReducers} from 'redux';
import {user_behavior} from '../reducers/user_reducer';

const initialState = {
  logged_in: false,
  user_name: ''
};

export const store = createStore(
  user_behavior,
  initialState
);

store.subscribe(()=>console.log('state: ', store.getState()));