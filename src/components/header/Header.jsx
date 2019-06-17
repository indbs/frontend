import React from 'react';
import s from './Header.module.css';
import logo from './29189.gif';


const Header = () => {
  return   <header className = {s.header}>
       <img src={require('./29189.gif')}  width="100" height="60"  />
    </header>
}
 export default Header;
