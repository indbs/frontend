import * as React from "react";

function Footer(props) {
    const styles = {
      footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        marginTop: '1rem',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        color: props.color,
      },
      line: {
        height:'0px',
        width:'90%',
        background: props.color,
      },
      text: {
        padding: '0.5rem',
      }
    }  
    
    return (
      <div style={styles.footer}>
        <div style={styles.line}>
        </div>
        
      </div>
    )
  }
  
  Footer.defaultProps = {
    color: '',
    title: ''
  }
  
  Footer.propTypes = {
    color: '',
    title: ''
  }

  export default Footer;