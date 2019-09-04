import   React, 
       { Component }                    from 'react';
import { Route, 
         Router, 
         Redirect, Link}                from "react-router-dom";
import                                     './App.css';

import   InfoRaisa                      from './scripts/infos/InfoRaisa';
import   InfoRaisa2                     from './scripts/infos/InfoRaisa2';
import   InfoFR05                       from './scripts/infos/InfoFR05';
import   InfoFR06                       from './scripts/infos/InfoFR06';
import   Siemens                        from './scripts/siemens/Siemens';
import   TwoTablesRaisa                 from './scripts/twoTables/TwoTablesRaisa'; 
import   GeneralTimeLine                from './scripts/timelines/GeneralTimeLine';
import   GraphTrend                     from './scripts/graphs/GraphTrend';
import { PrivateRoute }                 from './components/PrivateRoute';
import { authenticationService }        from './services/authentication';
import { history }                      from './helpers/history';
import   SignIn                         from './containers/SignIn'
import   logo                           from './logos/fp_logo.svg';
import   LogoutLogo                     from './logos/logout_logo'
import   RegistrationForm               from './containers/Registration'
import { kiln_constants_ru,
         kiln_constants_en }            from './constants/kiln_constants'

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
  
  render() {
    const { currentUser } = this.state;

    return (
      
      <div id='welcome_guys_to_our_best_industrial_information_solution_software' style = {{'text-align': 'center'}}>
        
        <Router id='router_here' history={history}>      
          {currentUser &&
            <div id='HorisontalMenu' style = {{'display': 'inline-block'}} >
              <div id='logout_navbar' style = {{'width': '1200px'}} >
                {currentUser &&
                  <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div id='inner_logout_navbar' className="navbar-nav">
                      <Link to="/generalTimeLine" className="nav-item nav-link">Обзор </Link>
                      <Link to="/raisa"           className="nav-item nav-link">{kiln_constants_ru.Раиса}   </Link>
                      <Link to="/raisa2"          className="nav-item nav-link">{kiln_constants_ru.Раиса2}  </Link>
                      <Link to="/fr05"            className="nav-item nav-link">{kiln_constants_ru.ФР05}    </Link>
                      <Link to="/fr06"            className="nav-item nav-link">{kiln_constants_ru.ФР06}    </Link>
                    </div>
                    <LogoutLogo/>
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
            <Route path =                    '/registration'               component={RegistrationForm} />
          </div>
          
          <Redirect to = '/welcomePage'/>
          
        </Router>

      </div>
    );
  }
}

export default App;