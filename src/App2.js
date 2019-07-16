
import * as React from "react";
import {NavLink} from 'react-router-dom';
import {BrowserRouter,Route, Redirect} from "react-router-dom";
import MenuItem from './MenuItem';
import MenuButton from './MenuButton';
import Menu from './Menu';
import Footer from './Footer';


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
    
    render(){
      const styles= 
        {
          container:{
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: '99',
            opacity: 0.9,
            display:'flex',
            alignItems:'center',
            background: '#b3cce6',
            width: '250px',
            color: 'white',
            fontFamily:'Lobster',
          },
          logo: {
            margin: '0 auto',
          },
          body: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            filter: this.state.menuOpen ? 'blur(2px)':null,
            transition: 'filter 0.5s ease',
          },
        }
      const menu = [ <NavLink to="/raisa" style={{color: 'white', textDecoration: 'none'}}  activeStyle={{color: 'white', textDecoration: 'none'}   }  > Раиса </NavLink>,
      <NavLink to="/raisa2" style={{color: 'white', textDecoration: 'none'}}  activeStyle={{color: 'white', textDecoration: 'none'}   }  > Раиса2 </NavLink>,
      <NavLink to="/fr06" style={{color: 'white', textDecoration: 'none'}}  activeStyle={{color: 'white', textDecoration: 'none'}   }  > ФР06 </NavLink>,
      <NavLink to="/fr05" style={{color: 'white', textDecoration: 'none'}}  activeStyle={{color: 'white', textDecoration: 'none'}   }  > ФР05 </NavLink>,
      <NavLink to="/simens" style={{color: 'white', textDecoration: 'none'}}  activeStyle={{color: 'white', textDecoration: 'none'}   }  > Сименс </NavLink>,
      <NavLink to="/redux" style={{color: 'white', textDecoration: 'none'}}  activeStyle={{color: 'white', textDecoration: 'none'}   }  > Redux </NavLink>,  
      <NavLink to="/generalTimeLine" style={{color: 'white', textDecoration: 'none'}}  activeStyle={{color: 'white', textDecoration: 'none'}   }  > generalTimeLine </NavLink>,
      <NavLink to="/GraphTrend" style={{color: 'white', textDecoration: 'none'}}  activeStyle={{color: 'white', textDecoration: 'none'}   }  > GraphTrend </NavLink>,
      'FOR EXAMPLE']
      const menuItems = menu.map((val,index)=>{
        return (
          <MenuItem 
            key={index} 
            delay={`${index * 0.1}s`}
            onClick={()=>{this.handleLinkClick();}}>{val}</MenuItem>
            
            
            
            
            )



      });
      
      return(
        <div>
          <div style={styles.container}>
            <MenuButton open={this.state.menuOpen} onClick={()=>this.handleMenuClick()} color='white'/>
            
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