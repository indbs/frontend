import React from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';





export class GraphRaisa extends React.Component{






    
    render(){

        const takeValue = this.props.commonValue;
        return (

           <div>
           <p>  Граф Номер  {takeValue.valuePass}</p>
         </div>

        )}

}

  export default GraphRaisa;