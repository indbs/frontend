import * as React from "react";
import App2 from './App2';
//import {BrowserRouter,Route, Redirect} from "react-router-dom";
import './verticalMenu/styleMenu.css';
var ReactDOMServer = require('react-dom/server');
require('datejs'); 
class Main extends React.Component {
  render(){   
    //Зачем определен стиль?
    const styles = {
      main: {
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        height: '100%',
      }
    }

    return ( 
      <div id='Main_AppInside' style={styles.main}>
        <App2 />
      </div>
    )
  }
}
export default Main;