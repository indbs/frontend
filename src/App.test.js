import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import App from './App'
import SignIn from './containers/localStorageTest';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.render(<SignIn  />, div);
  
  ReactDOM.unmountComponentAtNode(div);
 
});
