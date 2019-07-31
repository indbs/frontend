

import { CHANGE_VALUES } from '../actions/actionTypes';




const initialState = [  {  
  windowTables: true,
  windowGraphic: false,
  selcted_oven: 'oven',
  selectedBorn: 1,
  lastBorn: 1
}];
// reducer принимает два значения – state и action. 
// В Redux-приложении всё проходит через редуктор. 
// Поэтому  поле action.type, чтобы reducer определял нужное действие:



function reduxValues (state = initialState, action) {
    if (action.type === 'CHANGE_VALUES') {
      console.log('I got test'); 
      alert('I got test');
      return [
       /* ...state, */
        {
             
            windowTables: action.windowTables,
            windowGraphic: action.windowGraphic,
            selcted_oven: action.selcted_oven,
            selectedBorn: action.selectedBorn,
            lastBorn: action.lastBorn
    }
      ];
    } else if (action.type === 'FETCH_USERS_SUCCESS') {
      return action.payload;
    }
    return state;
  }
  
  


export default reduxValues;