

import React, { Component } from 'react';
import {BrowserRouter,Route, Redirect} from "react-router-dom";
import './App.css';
import Header from './components/header/Header';
import Navbar from './components/navBar/Navbar';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';

import MenuList from './containers/menu-list.js'
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
import Main from './Main';
import { connect } from 'react-redux';  // ретиратор из реакт-редакс
import { getUsers } from './actions/users';
import GeneralTimeLine from './scripts/GeneralTimeLine';
import Redux from './scripts/Redux';
import { store } from "./store";
import GraphTrend from './scripts/GraphTrend';

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


class App extends Component {
  render() {
    console.log("users: ",this.props.users);
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
                  <Route path = '/menu' render={ () => <Main /> } />
                  <Route path = '/redux' render={ () => <Redux />} />
                  <Route path = '/generalTimeLine' render={ () => <generalTimeLine />} />
                  <Route path = '/GraphTrend' render={ () => <GraphTrend />} />
                  <Route path = './containers/localStorageTest' render={ () => <SignIn />} />
           <div className = 'app-wrapper-content'>    
           <Main /> 
     <div>
     <MenuList />
     <div>
     <SignIn />
     </div>
     </div>
    </div>
    </div>
      </BrowserRouter>
    );
  }
}

export default App;