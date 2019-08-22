import {createStore, combineReducers}   from 'redux';
import {user_behavior}                  from '../reducers/user_reducer';
import {aux_data_received}              from '../reducers/aux_data_receiving_reducer';
import {graph_mode_selection}           from '../reducers/graph_mode_reducer'

export const store = createStore(
  combineReducers({
    user_behavior, 
    aux_data_received,
    graph_mode_selection
  })
);

store.subscribe(()=>console.log('state: ', store.getState()));