import * as React from "react";
import {NavLink} from 'react-router-dom';
//import {BrowserRouter,Route, Redirect} from "react-router-dom";
import MenuItem from './MenuItem';
import MenuButton from './MenuButton';
import Menu from './Menu';
import './verticalMenu/styleMenu.css';

class VerticalMenu extends React.Component {
  
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
          background: '#657687',
          width: '250px',
          color: 'white',
          //fontFamily:'Lobster',
        },
        logo: {
          margin: '0 auto',
        },
        body: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          filter: this.state.menuOpen ? 'blur(5px)':null,
          transition: 'filter 5s ease',   //Не работает?
        },
      }

    const menu = [ 
      <NavLink to="/raisa"            style={{color: 'inherit', padding: '15px', textDecoration: 'none'}}> Раиса            </NavLink>,
      <NavLink to="/raisa2"           style={{color: 'inherit', padding: '15px', textDecoration: 'none'}}> Раиса2           </NavLink>,
      <NavLink to="/fr06"             style={{color: 'inherit', padding: '15px', textDecoration: 'none'}}> ФР06             </NavLink>,
      <NavLink to="/fr05"             style={{color: 'inherit', padding: '15px', textDecoration: 'none'}}> ФР05             </NavLink>,
      <NavLink to="/siemens"          style={{color: 'inherit', padding: '15px', textDecoration: 'none'}}> Сименс           </NavLink>, 
      <NavLink to="/generalTimeLine"  style={{color: 'inherit', padding: '15px', textDecoration: 'none'}}> generalTimeLine  </NavLink>,
      <NavLink to="/GraphTrend"       style={{color: 'inherit', padding: '15px', textDecoration: 'none'}}> GraphTrend       </NavLink>
    ];

    const menuItems = menu.map((val,index)=>{
      //console.log(val);
      return (
        <MenuItem 
          key={index} 
          delay={`${index * 0.05}s`}
          onClick={()=>{this.handleLinkClick();}}>
            {val}
        </MenuItem> 
        )
    });
    
    return(
      <div id='VerticalMenu'>
        <div id='VerticalMenuContainer' style={styles.container}>
          <MenuButton open={this.state.menuOpen} onClick={()=>this.handleMenuClick()} color='white'/>           
        </div>
        <Menu open={this.state.menuOpen}>
          {menuItems}
        </Menu>
      </div>
    )
  }
}

export default VerticalMenu;