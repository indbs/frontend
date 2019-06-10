import React, { Component }  from 'react';


class ChildDivTable extends React.Component {
    render() {
        const commonValue = this.props.valuePass;


      return (
        <div>


<p> ChildDivЕTable </p>
       
        <p> Take a value  {commonValue.valuePass}</p>
       
        
          <p>The mouse position is {commonValue.valuePass}</p>
        

        </div>
      );
    }
  }
  export default  ChildDivTable ;