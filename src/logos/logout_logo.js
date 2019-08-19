import React, { Component }           from 'react';
import logout                         from './logout.svg';
import { authenticationService }      from '../services/authentication';
import { history }                    from '../helpers/history';
import { connect }                    from 'react-redux';
import {login_action, logout_action}  from '../actions/user_actions';

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
    this.props.handleLogout();
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

const mapStateToProps = state => ({
  logged_in: state.logged_in
})

const mapDispatchToProps = dispatch => ({
  handleLogout(){
    dispatch(logout_action());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LogoutLogo);