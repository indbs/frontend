import React, { Component } from 'react';
import {BrowserRouter, Route, Router, Redirect, Link} from "react-router-dom";
import './App.css';
import Header from './components/header/Header';
import Navbar from './components/navBar/Navbar';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';

import HorisontalMenu from './containers/horisontalMenu.js'
import ContactDetail from './containers/contact-detail'

import { render } from "react-dom";
import { Chart } from "react-google-charts";
import * as axios  from 'axios';
import InfoRaisa from './scripts/InfoRaisa';
import InfoRaisa2 from './scripts/InfoRaisa2';
import InfoFR05 from './scripts/InfoFR05';
import InfoFR06 from './scripts/InfoFR06';
import Siemens from './scripts/Siemens';
import TwoTablesRaisa from './scripts/TwoTablesRaisa'; 
//import { connect } from 'react-redux';  // ретиратор из реакт-редакс
import { getUsers } from './actions/users';
import GeneralTimeLine from './scripts/GeneralTimeLine';
import Redux from './scripts/Redux';
import { store } from "./store";
import GraphTrend from './scripts/GraphTrend';
import VerticalMenu from './VerticalMenu';
import WelcomePage from './welcomePage'
import { PrivateRoute } from './components/PrivateRoute';
import { authenticationService } from './services/authentication';
import { history } from './helpers/history';
import SignIn from './containers/SignIn'
import logo from './fp_logo.svg';
import LogoutLogo from './logout_logo'

var ReactDOMServer = require('react-dom/server');
require('datejs'); 

class App extends Component {
 
  constructor(props) {
    super(props);

    this.state = {
        currentUser: null
    };
  }

  componentDidMount() {
    document.title = "General Timeline React"
    authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
  }

  logout() {
    authenticationService.logout();
    history.push('/welcomePage');
  }
  
  render() {
    //Создаются объекты Router, которые потом передаются в вертикальное меню списком как объекты NavLink.
    console.log("users: ", this.props.users);

    const { currentUser } = this.state;

    return (
      
      <div id='welcome_guys_to_our_best_industrial_information_solution_software' style = {{'text-align': 'center'}}>
        
        <Router id='router_here' history={history}>      
          {/*<div id= 'content' className = 'app-wrapper' >*/}
          {currentUser &&
            <div id='HorisontalMenu' style = {{'display': 'inline-block'}} >
              <div id='logout_navbar' style = {{'width': '1200px'}} >
                {currentUser &&
                  <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div id='inner_logout_navbar' className="navbar-nav">
                      <Link to="/generalTimeLine" className="nav-item nav-link">Обзор</Link>
                      <Link to="/raisa"           className="nav-item nav-link">Раиса</Link>
                      <Link to="/raisa2"          className="nav-item nav-link">Раиса2</Link>
                      <Link to="/fr05"            className="nav-item nav-link">ФР05</Link>
                      <Link to="/fr06"            className="nav-item nav-link">ФР06</Link>
                    </div>
                    <LogoutLogo/>
                  </nav>
                }
              </div>
              {/*<HorisontalMenu />*/}
            </div>
          }     

          <div id= 'content' className = 'app-wrapper' >
            <PrivateRoute exact path =       '/raisa'                      component={InfoRaisa} />
            <PrivateRoute exact path =       '/raisa2'                     component={InfoRaisa2} />
            <PrivateRoute exact path =       '/fr06'                       component={InfoFR06} />
            <PrivateRoute exact path =       '/fr05'                       component={InfoFR05} />
            <PrivateRoute exact path =       '/siemens'                    component={Siemens} />
            <PrivateRoute exact path =       '/twoTablesRaisa'             component={TwoTablesRaisa} />
            <PrivateRoute exact path =       '/generalTimeLine'            component={GeneralTimeLine} />
            <PrivateRoute exact path =       '/GraphTrend'                 component={GraphTrend} />
            <Route path =                    '/welcomePage'                component={SignIn} />
          {/*
          {currentUser &&
            <div id='app-wrapper-content' className = 'app-wrapper-content'>    
              <VerticalMenu />
            </div>
          }
          */}
          </div>
          
          <Redirect to = '/welcomePage'/>
          
          {/*</div>*/}
        </Router>

      </div>
    );
  }
}

export default App;