import { combineReducers } from 'redux';
   
/*В каждой из папок создаем файл index.js, что позволит начать работу каждой функции. Теперь будем работать с нашим приложением из статьи.*/


import users from './users';
import windows from './windows';
import filterUsers from './filterUsers';
import reduxValues from './reduxValues';
import ContactsReducer from './reducer_contacts'
import ActiveContactReducer from './reducer_active_contact'

export default combineReducers({

  reduxValues,
  contacts: ContactsReducer,
	activeContact: ActiveContactReducer

});



