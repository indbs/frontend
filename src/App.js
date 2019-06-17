import * as React from "react";

import {BrowserRouter,Route} from "react-router-dom";
import './App.css';
import Header from './components/header/Header';
import Navbar from './components/navBar/Navbar';


import { render } from "react-dom";
import { Chart } from "react-google-charts";
import * as axios  from 'axios';
import InfoRaisa from './scripts/InfoRaisa';
import InfoRaisa2 from './scripts/InfoRaisa2';
import InfoFR05 from './scripts/InfoFR05';
import InfoFR06 from './scripts/InfoFR06';

import GeneralTimeLine from './scripts/GeneralTimeLine';
import GraphTest from './scripts/GraphTest';



function App()  {


  return (
    <BrowserRouter>
    <div className = 'app-wrapper' >
        <Header />
        <Navbar />
      
      <div className = 'app-wrapper-content'>

          <Route path = '/generalTimeLine' render={ () => <GeneralTimeLine /> } />
          <Route path = '/raisa' render={ () => <InfoRaisa /> } />
          <Route path = '/raisa2' render={ () => <InfoRaisa2 /> } />
          <Route path = '/fr06' render={ () => <InfoFR06 /> } />
          <Route path = '/fr05' render={ () => <InfoFR05 /> } />
          </div>


      </div>);
</BrowserRouter>
)
}
export default App;


