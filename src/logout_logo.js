import React, { Component } from 'react';
import logout from './logout.svg';
import { authenticationService } from './services/authentication';
import { history } from './helpers/history';

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

export default LogoutLogo;