import * as React from "react";
import App2 from './App2';
import {BrowserRouter,Route, Redirect} from "react-router-dom";

import './styleMenu.css';


var ReactDOMServer = require('react-dom/server');
require('datejs'); 


class Main extends React.Component {
    render(){
      const styles = {
        main: {
          display:'flex',
          flexDirection:'column',
          alignItems: 'center',
          height: '100%',
        }
      }
      
      return (

        
        <div style={styles.main}>
          <App2 />
          <p>  HELOO </p>
        </div>

      
      )
    }
  }
  export default Main;