import React, {Component}             from 'react';
import logout                         from './logout.svg';
import {authenticationService}        from '../services/authentication';
import {history}                      from '../helpers/history';
import {connect}                      from 'react-redux';
import {logout_action}                from '../actions/user_actions';
import {burn_graph_number_clean}      from '../actions/aux_data_receiving_actions'

// Open door logo on logout button in upper horisontal menu
class LogoutLogo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovered: false
    };
  }
  
  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  }

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  }

  handleClick = () => {
    this.props.dispatch();
    authenticationService.logout();
    history.push('/welcomePage');
  }

  render(){
    return(
      <div id='logout_logo_container' onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={this.handleClick}>
        <img src={logout} className="logout-logo" alt="logout"
          className={this.state.isHovered ? 'logout-logo' : 'logout-logo-hover'}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch(){
    dispatch(logout_action());
    dispatch(burn_graph_number_clean());
  }
})

export default connect(null, mapDispatchToProps)(LogoutLogo);