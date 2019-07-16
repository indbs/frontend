

import React, { Component } from 'react';
import {BrowserRouter,Route, Redirect} from "react-router-dom";
import './App.css';
import Header from './components/header/Header';
import Navbar from './components/navBar/Navbar';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';




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
 addUser() {
      console.log('addUser', this.userInput.value);
      this.props.onAddUser(this.userInput.value);
      this.userInput.value = '';
  }

  findUser() {
    console.log('findUser', this.searchInput.value);
    this.props.onFindUser(this.searchInput.value);
  }


  handleSubmitRaisa = (e) => {
    
   
    console.log("before CHANGE_VALUES", store.getState());
    e.preventDefault();
 

    store.dispatch({
      

      type: "CHANGE_VALUES",
      windowTables: false,
      windowGraphic: true,
      selcted_oven: 'raisa',
      selectedBorn: 2,
      lastBorn: 7
    })
    console.log("after CHANGE_VALUES", store.getState());

  
   
  }

  handleSubmitRaisa2 = (e) => {

    e.preventDefault();
    console.log("before CHANGE_VALUES", store.getState());
    store.dispatch({
      type: "CHANGE_VALUES",
      windowTables: false,
      windowGraphic: true,
      selcted_oven: 'raisa2',
      selectedBorn: 2,
      lastBorn: 7
    })
    console.log("after CHANGE_VALUES", store.getState());
    window.location.assign('http://localhost:3000/raisa2');
  }

  
  handleSubmitFR05 = (e) => {
    e.preventDefault();
    console.log("before CHANGE_VALUES", store.getState());
    store.dispatch({
      type: "CHANGE_VALUES",
      windowTables: false,
      windowGraphic: true,
      selcted_oven: 'FR05',
      selectedBorn: 2,
      lastBorn: 7
    })
    console.log("after CHANGE_VALUES", store.getState());
    window.location.assign('http://localhost:3000/fr05');
  }

  handleSubmitFR06 = (e) => {
    e.preventDefault();
    console.log("before CHANGE_VALUES", store.getState());
    store.dispatch({
      type: "CHANGE_VALUES",
      windowTables: false,
      windowGraphic: true,
      selcted_oven: 'FR06',
      selectedBorn: 2,
      lastBorn: 7
    })
    console.log("after CHANGE_VALUES", store.getState());
    window.location.assign('http://localhost:3000/fr06');
  }


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
              
           <div className = 'app-wrapper-content'>    
           <Main /> 
  

           </div>
      
      </div>
      </BrowserRouter>
    );
  }
}
/*
const mapStateToProps = function(state) {
  return {
    windowTables: state.reduxValues[0].windowTables,
    windowGraphic: state.reduxValues[0].windowGraphic,
    id: state.reduxValues[0].id
  }
}
*/
export default App;