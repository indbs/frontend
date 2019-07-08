
import * as React from "react";



import {BrowserRouter,Route, Redirect} from "react-router-dom";




import MenuItem from './MenuItem';

import MenuButton from './MenuButton';
import Menu from './Menu';
import Footer from './Footer';
import {NavLink} from 'react-router-dom';
import inactive from  './App2.module.css';
import active from  './App2.module.css';
import  './App2.module.css';

class App2 extends React.Component {
    constructor(props){
      super(props);
      this.state={
        menuOpen:false,
      }
    }
    
    handleMenuClick() {
      this.setState({menuOpen:!this.state.menuOpen});
    }
    
    handleLinkClick() {
      this.setState({menuOpen: false});
    }
    
    render(){          /*первое меню*/ 
      const styles= 
        {
          container:{
            position: 'absolute',
            top: 0,
            right:0,
            zIndex: '99',
            opacity: 0.9,
            display:'flex',
            alignItems:'right',
            background: '#b3cce6',
            width: '30%',
            color: 'white',
            fontFamily:'Lobster',
            textDecoration: 'none'
          },
          logo: {
            margin: '0 auto',
          },
          body: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '30%',
            height: '100%',
            filter: this.state.menuOpen ? 'blur(2px)':null,
            transition: 'filter 0.5s ease',
          },
        }
        

      const menu = [ <NavLink to="/raisa"  style={{color: 'white', textDecoration: 'none'}}  activeStyle={{color: 'white', textDecoration: 'none'}  }  > Раиса </NavLink>, 
      <NavLink to="/raisa2"          activeStyle ={"active"}> Раиса2 </NavLink>,
      'Services','FAQ','Contact Us']
      const menuItems = menu.map((val,index)=>{
        return (
          <MenuItem 
            key={index} 
            delay={`${index * 0.1}s`}
            onClick={
                      ()=>{this.handleLinkClick();}}>
                          

                          {val}            </MenuItem>)
      });
      
      return(
        <div>
          <div style={styles.container}>
            <MenuButton open={this.state.menuOpen} onClick={()=>this.handleMenuClick()} color='white'/>
           
            <div style={styles.logo}></div>
         
         
          </div>
          <Menu open={this.state.menuOpen}>
            {menuItems}
          </Menu>
          <div style={styles.body}>
            <Footer name='Menu'/>
          </div>
        </div>
      )
    }
  }

 
  export default App2;
 