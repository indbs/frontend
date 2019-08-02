import React from 'react';

class MenuItem extends React.Component{
    
  constructor(props){
      super(props);
      this.state = {
        hover:false,
      }
    }
    
  handleHover(){
    this.setState({hover:!this.state.hover});
  }
  
  render(){
    const styles={
      container: {
        opacity: 0,
        animation: '1s appear forwards',
        animationDelay:this.props.delay,
      },
      menuItem:{
        fontFamily:`'Open Sans', sans-serif`,
        fontSize: '1.2rem',
        padding: '1rem 0',
        margin: '0 5%',
        cursor: 'pointer',
        color: this.state.hover? '#657687':'white',
        //background: this.state.hover? '#a9bad4':'#b3cce6',
        transition: 'color 0.2s ease-in-out',
        animation: '0.5s slideIn forwards',
        animationDelay:this.props.delay,
        textDecoration: 'none',
      },
      line: {
        width: '90%',
        height: '0px',          //Вместо этого можно вообще удалить объект line из разметки.
        'border-radius': '1px',
        background: '#9fbfdf',
        margin: '0 auto',
        animation: '0.0s shrink forwards',
        animationDelay:this.props.delay,   
      }
    }
    return(
      <div id='MenuItemContainer' style={styles.container}>
        <div 
          id='MenuItem'
          style={styles.menuItem} 
          onMouseEnter={()=>{this.handleHover();}} 
          onMouseLeave={()=>{this.handleHover();}}
          onClick={this.props.onClick}
        >
          {this.props.children}  
        </div>
      <div id='underline' style={styles.line}/>
    </div>  
    )
  }
}

export default MenuItem;