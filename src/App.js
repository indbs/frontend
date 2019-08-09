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
      
      <div id='welcome_guys_to_our_best_industrial_information_solution_software'>
        
        <Router history={history}>      
          {/*<div id= 'content' className = 'app-wrapper' >*/}
          {currentUser &&
            <div id='HorisontalMenu' style = {{'margin-left': '10%'}} >
              <HorisontalMenu />
              <div id='logout_navbar' style = {{'width': '1200px'}} >
                {currentUser &&
                  <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div id='inner_logout_navbar' className="navbar-nav">
                      <Link to="/welcomePage" className="nav-item nav-link">Войти</Link>
                      <a onClick={this.logout} className="nav-item nav-link">Выйти</a>
                    </div>
                  </nav>
                }
              </div>
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
          </div>
          
          <Redirect to = '/welcomePage'/>

          {currentUser &&
            <div id='app-wrapper-content' className = 'app-wrapper-content'>    
              <VerticalMenu />
            </div>
          }


          {/*</div>*/}
        </Router>

      </div>
    );
  }
}

export default App;