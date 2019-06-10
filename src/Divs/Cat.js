
import React, { Component }  from 'react';


class Cat extends React.Component {
    render() {
        const mouse = this.props.mouse;


      return (
        <div>


<p> Я кошка </p>
        <p> Меня зовут   </p>
        <p> Я кошка дружу с мышкой ее зовут  {mouse.nameMouse}</p>
       
        
          <p>The mouse position is {mouse.x}</p>
      

        </div>
      );
    }
  }
  export default Cat;