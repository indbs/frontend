import React from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';



export class GraphTrend extends React.Component {
        
    requestData(){
        var takeValue = this.props.valueTrend;
     
    }

   
    componentWillReceiveProps() {
        this.requestData();      
    }


    render() {

        var takeValue = this.props.valueTrend;

      return (
        <div className="GraphPage">    
                     
                <div>
             
                  <p>  Тренд Номер Catch2 {this.props.vvalueTrend}</p>
                </div>
                   
        </div>
      );
    }
  }
 
  export default GraphTrend;