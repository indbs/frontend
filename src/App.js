import React, { Component } from 'react';
import {BrowserRouter,Route, Redirect} from "react-router-dom";
import './App.css';
import Header from './components/header/Header';
import Navbar from './components/navBar/Navbar';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';

import HorisontalMenu from './containers/horisontalMenu.js'
import ContactDetail from './containers/contact-detail'
import SignIn from './containers/localStorageTest.js'

import { render } from "react-dom";
import { Chart } from "react-google-charts";
import * as axios  from 'axios';
import InfoRaisa from './scripts/InfoRaisa';
import InfoRaisa2 from './scripts/InfoRaisa2';
import InfoFR05 from './scripts/InfoFR05';
import InfoFR06 from './scripts/InfoFR06';
import Simens from './scripts/Simens';
import TwoTablesRaisa from './scripts/TwoTablesRaisa'; 
//import { connect } from 'react-redux';  // ретиратор из реакт-редакс
import { getUsers } from './actions/users';
import GeneralTimeLine from './scripts/GeneralTimeLine';
import Redux from './scripts/Redux';
import { store } from "./store";
import GraphTrend from './scripts/GraphTrend';
import VerticalMenu from './VerticalMenu';

var ReactDOMServer = require('react-dom/server');
require('datejs'); 

/*  <Redirect to = '/generalTimeLine'/>*/

class App extends Component {
  render() {
    //Создаются объекты Router, которые потом передаются в вертикальное меню списком как объекты NavLink.
    console.log("users: ", this.props.users);
    return (
      <div id='welcome_guys_to_our_best_industrial_information_solution_software'>
        <div id='HorisontalMenu'>
          <HorisontalMenu />
        </div>  
        <div id='SignIn'>
          <SignIn />
        </div>
        <BrowserRouter>      
          <div id= 'menu' className = 'app-wrapper' >
            
            <Route path = '/generalTimeLine'                render={ () => <GeneralTimeLine /> } />
            <Route path = '/raisa'                          render={ () => <InfoRaisa /> } />
            <Route path = '/raisa2'                         render={ () => <InfoRaisa2 /> } />
            <Route path = '/fr06'                           render={ () => <InfoFR06 /> } />
            <Route path = '/fr05'                           render={ () => <InfoFR05 /> } />
            <Route path = '/simens'                         render={ () => <Simens /> } />
            <Route path = '/twoTablesRaisa'                 render={ () => <TwoTablesRaisa /> } />
            <Route path = '/generalTimeLine'                render={ () => <generalTimeLine />} />
            <Route path = '/GraphTrend'                     render={ () => <GraphTrend />} />
            <Route path = './containers/localStorageTest'   render={ () => <SignIn />} />
            
            <div id='app-wrapper-content' className = 'app-wrapper-content'>    
              <VerticalMenu />
            </div>

          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;