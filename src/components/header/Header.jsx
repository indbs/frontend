import React from 'react';
import s from './Header.module.css';

import logo from './ic_launcher_foreground.svg';

const Header = () => {
  return   <header className = {s.header}>
      <img src={logo} className="App-logo" alt="logo" height ="70px" />
    </header>
}
 export default Header;
