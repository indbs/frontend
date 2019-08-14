import * as React from "react";

class Menu extends React.Component {
 
  constructor(props){
    super(props);
    this.state={
      open: this.props.open? this.props.open:false,
    }
  }
    
  componentWillReceiveProps(nextProps){
    if(nextProps.open !== this.state.open){
      this.setState({open:nextProps.open});
    }
  }
  
  render(){
    const styles={
      container: {
        position: 'fixed',
        top: 0,
        right: 0,
        height: this.state.open? '100%': '100%',  //Чтобы не отображались бегунки при превышении размеров экрана!
        width: '250px',
        display: 'flex',
        flexDirection: 'column',
        background: '#b3cce6',  /*не трогать*/
        opacity: 0.95,
        //color: '#fafafa',
        transition: 'height 0.3s ease',
        zIndex: 2,
      },
      menuList: {
        paddingTop: '3rem',
      }
    }
    return(
      <div id='menu_list' style={styles.container}>
        {
          this.state.open?
            <div id='insideMenu_list' style={styles.menuList}>
              {this.props.children}
            </div>:null
        }
      </div>
    )
  }
}

export default Menu;