import * as React from "react";

class MenuButton extends React.Component {
  constructor(props){
    super(props);
    this.state={
      open: this.props.open? this.props.open:false,
      color: this.props.color? this.props.color:'#b3cce6',
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.open !== this.state.open){
      this.setState({open:nextProps.open});
    }
  }
  
  handleClick(){
    this.setState({open:!this.state.open});
  }
  
  render(){
    const styles = {
      container: {
        height: '52px',   //32px before import  '../bootstrap.min.css'; in localStorageTest.js
        width: '52px',
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignItems: 'right',
        cursor: 'pointer',
        padding: '10px',
        
      },
      line: {
        height: '3px',
        'border-radius': '2px',
        width: '36px',
        background: this.state.color,
        transition: 'all 0.2s ease',
      },
      lineTop: {
        transform: this.state.open ? 'rotate(45deg)':'none',
        transformOrigin: 'top left',
        marginBottom: '10px',
        marginRight: 'auto',
        background:   this.state.open ? '#c9c7c7':'white',
      },
      lineMiddle: {
        opacity: this.state.open ? 0: 1,
        transform: this.state.open ? 'translateX(-16px)':'none',
      },
      lineBottom: {
        transform: this.state.open ? 'translateX(-1px) rotate(-45deg)':'none',
        transformOrigin: 'top left',
        marginTop: '10px',
        background:   this.state.open ? '#c9c7c7':'white',
      },       
    }
    return(
      <div id='hamburger_container' style={styles.container} 
        onClick={this.props.onClick ? this.props.onClick: ()=> {this.handleClick();}}>
        <div id='line1' style={{...styles.line,...styles.lineTop}}/>
        <div id='line2' style={{...styles.line,...styles.lineMiddle}}/>
        <div id='line3' style={{...styles.line,...styles.lineBottom}}/>
      </div>
    )
  }
}

export default MenuButton;