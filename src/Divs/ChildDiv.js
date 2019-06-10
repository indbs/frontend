import React, { Component }  from 'react';


class ChildDiv extends React.Component {
    render() {
        const commonValue = this.props.commonValue;


      return (
        <div>


<p> ChildDiv </p>
       
        <p> Take a value  {commonValue.valuePass}</p>
       
        
          <p>The mouse position is {commonValue.valuePass}</p>
      

        </div>
      );
    }
  }
  export default ChildDiv;