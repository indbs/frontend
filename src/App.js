import React, { Component } from 'react';
import {BrowserRouter,Route, Redirect, Link} from "react-router-dom";
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
  }
  
  render() {
    //Создаются объекты Router, которые потом передаются в вертикальное меню списком как объекты NavLink.
    console.log("users: ", this.props.users);

    const { currentUser } = this.state;

    return (
      
      <div id='welcome_guys_to_our_best_industrial_information_solution_software'>
        
        {currentUser &&
          <div id='HorisontalMenu' style = {{'margin-left': '10%'}} >
            <HorisontalMenu />
          </div>
        } 

        <BrowserRouter>      
          <div id= 'content' className = 'app-wrapper' >
             {/*  
            <div id='logout_navbar'>
              {currentUser &&
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                  <div id='inner_logout_navbar' className="navbar-nav">
                    <Link to="/" className="nav-item nav-link">Home</Link>
                    <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                  </div>
                </nav>
              }
            </div>
                     
            <div className="jumbotron">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 offset-md-3">
                    <PrivateRoute exact path="/" component={WelcomePage} />
                    <Route path="/welcomePage" component={WelcomePage} />
                  </div>
                </div>
              </div>
            </div>
            */} 
            
            <div>
              <Route path = '/raisa'              render={ () => <InfoRaisa /> } />
              <Route path = '/raisa2'             render={ () => <InfoRaisa2 /> } />
              <Route path = '/fr06'               render={ () => <InfoFR06 /> } />
              <Route path = '/fr05'               render={ () => <InfoFR05 /> } />
              <Route path = '/simens'             render={ () => <Siemens /> } />
              <Route path = '/twoTablesRaisa'     render={ () => <TwoTablesRaisa /> } />
              <Route path = '/generalTimeLine'    render={ () => <GeneralTimeLine />} />
              <Route path = '/GraphTrend'         render={ () => <GraphTrend />} />
              <Route path = '/welcomePage'        render={ () => <WelcomePage />} />
            </div>
            
            <Redirect to = '/welcomePage'/>
            
            {currentUser &&
              <div id='app-wrapper-content' className = 'app-wrapper-content'>    
                <VerticalMenu />
              </div>
            }


          </div>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;