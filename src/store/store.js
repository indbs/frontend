import {createStore, combineReducers}   from 'redux';
import {user_behavior}                  from '../reducers/user_reducer';
import {aux_data_received}              from '../reducers/aux_data_receiving_reducer';

const initialState = {
  logged_in: false,
  user_name: '',
};

export const store = createStore(
  combineReducers({user_behavior, aux_data_received}),
  initialState
);

store.subscribe(()=>console.log('state: ', store.getState()));