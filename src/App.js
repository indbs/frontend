import * as React from "react";

import {BrowserRouter,Route, Redirect} from "react-router-dom";
import './App.css';
import Header from './components/header/Header';
import Navbar from './components/navBar/Navbar';
import MenuWrap from './MenuWrap';



import { render } from "react-dom";
import { Chart } from "react-google-charts";
import * as axios  from 'axios';
import InfoRaisa from './scripts/InfoRaisa';
import InfoRaisa2 from './scripts/InfoRaisa2';
import InfoFR05 from './scripts/InfoFR05';
import InfoFR06 from './scripts/InfoFR06';
import Simens from './scripts/Simens';
import TwoTablesRaisa from './scripts/TwoTablesRaisa'; 




import GeneralTimeLine from './scripts/GeneralTimeLine';



var ReactDOMServer = require('react-dom/server');
require('datejs'); 


const columns = [
  { type: "string", id: "Role" },
  { type: "string", id: "Name" },
  { type: "string", id: 'style', role: 'style' },
  { type: 'string', role: 'tooltip','p': {'html': true}},
  { type: 'date', id: 'Start' },
  { type: 'date', id: 'Stop' }
];

/*  <Redirect to = '/generalTimeLine'/>*/

function App()  {


  return (
    <BrowserRouter>
    <div className = 'app-wrapper' >
    
          <Route path = '/generalTimeLine' render={ () => <GeneralTimeLine /> } />
          <Route path = '/raisa' render={ () => <InfoRaisa /> } />
          <Route path = '/raisa2' render={ () => <InfoRaisa2 /> } />
          <Route path = '/fr06' render={ () => <InfoFR06 /> } />
          <Route path = '/fr05' render={ () => <InfoFR05 /> } />
          <Route path = '/simens' render={ () => <Simens /> } />
          <Route path = '/twoTablesRaisa' render={ () => <TwoTablesRaisa /> } />
          <Route path = '/menu' render={ () => <MenuWrap /> } />
      
        
      <div className = 'app-wrapper-content'>    
      <Header />
      <Navbar />
      </div>
      
      </div>);
</BrowserRouter>
)
}
export default App;

