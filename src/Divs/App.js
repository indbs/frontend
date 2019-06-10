import React, { Component }  from 'react';
import logo from './logo.svg';
import './App.css';


import Mouse from './Divs/Mouse';
import MouseWithCat from './Divs/MouseWithCat';
import Cat from './Divs/Cat';
import MainDiv from './Divs/MainDiv';
import MainDivTable from './Divs/MainDivTable';
import FlavorForm  from './Divs/FlavorForm';




class App extends Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <MainDiv />
      </div>
    );
  }
}
export default App;
