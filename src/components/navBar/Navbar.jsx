import React from 'react';
import s from  './/Navbar.module.css';
import {NavLink} from 'react-router-dom';

console.log(s);

let c1 = "item";
let c2 = "active";
let classes = c1 +" "+ c2;

let classesNew  = '${s.item} ${c2}';

const Navbar = () => {
return   (


 
       <nav className = {s.nav} >
       <div className = {s.item} >
            <NavLink to="/raisa" activeClassName ={s.activeLink} > Раисаuti </NavLink> </div>
       <div className = { s.item }>
             <NavLink to="/raisa2" activeClassName ={s.activeLink}> Раиса2 </NavLink> </div>
      <div className = { s.item }>
            <NavLink to="/fr06" activeClassName ={s.activeLink} > ФР06 </NavLink> </div>      
      <div className = { s.item }>
            <NavLink to="/fr05" activeClassName ={s.activeLink} > ФР05 </NavLink> </div>
     <div className = { s.item }>
            <NavLink to="/generalTimeLine" activeClassName ={s.activeLink} > Диспетчер обжигов </NavLink> </div>
     <div className = { s.item }>
            <NavLink to="/simens" activeClassName ={s.activeLink} > Сименс </NavLink> </div>      
      <div className = { s.item }>
            <NavLink to="/twoTablesRaisa" activeClassName ={s.activeLink} > TwoTablesRaisa </NavLink> </div> 
      
      <div className = { s.item }>
            <NavLink to="/menu" activeClassName ={s.activeLink} > Menu </NavLink> </div> 

      <div className = { s.item }>
            <NavLink to="/redux" activeClassName ={s.activeLink} > Redux </NavLink> </div>       
             
      <div className = { s.item }>
            <NavLink to="/GraphTrend" activeClassName ={s.activeLink} > GraphTrend </NavLink> </div>        
   

 </nav>
)
}
 export default Navbar;
