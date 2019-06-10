import React, { Component } from 'react';
import Cat from './Cat';

class Mouse  extends Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = {  x: 0, y: 0,
                    nameMouse: "Крошка",
                    sizeMouse: 989
    };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY,
      nameMouse: "КрошкаМылышка",
      sizeMouse: 777
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        <p> Я мышка </p>
        <p> Меня зовут  {this.state.nameMouse}, {this.state.sizeMouse} </p>
        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
        <Cat mouse={this.state} />
      </div>
    );
  }
}

export default Mouse ;