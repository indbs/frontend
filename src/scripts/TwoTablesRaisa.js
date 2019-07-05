import React from 'react';
//import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import axios from 'axios';

import moment from 'moment';
import 'moment/locale/ru';

import './InfoRaisa.css';
import './style.css';

var ReactDOMServer = require('react-dom/server');
require('datejs');  

function getTimeFromMins(x) { 
       var mins = Number(x);
       let hours = Math.trunc(mins/60); 
       let minutes = mins % 60; 
       return hours + 'ч. ' + minutes+'мин.';
}


export class TwoTablesRaisa extends React.Component{


    requestData(){
        const takeValue = this.props.value1;
        var x = Number(takeValue.valuePass);
     

        const self = this;
        const data_urlHeart = "http://172.16.20.75:8060/?heat_table=raisa&program_number="+x+"&year=2019";
        const data_urlGas =   "http://172.16.20.75:8060/?gas_table=raisa&program_number="+x+"&year=2019";

        const rowsTableHeart= [];
        const rowsTableGaz= [];
        axios.get(data_urlHeart)
                .then(function (response) {
                    const dataTable=response.data;
                    const minValue=(Date.today().addMonths(-1));
                    for (let i = 0; i < dataTable.length; i += 1) {         
                            rowsTableHeart.push(
                                [
                                    dataTable[i].STEP_NO,     
                                    dataTable[i].T_M_MODE,
                                    dataTable[i].T_M_TEMP,
                                    getTimeFromMins(dataTable[i].T_M_TIME_WIDTH),
                            ]         
                          );
                    }
                    self.setState({dataTableHeart: rowsTableHeart});
                })
                axios.get(data_urlGas)        
                .then(function (response) { 
             const dataTable=response.data;
             const minValue=(Date.today().addMonths(-1));
             for (let i = 0; i < dataTable.length; i += 1) {         
                 rowsTableGaz.push(
                         [
                             dataTable[i].STEP_NO,     
                             dataTable[i].T_G_MODE,
                             dataTable[i].T_G_FLOW,
                             dataTable[i].T_G_OXYG,
                             getTimeFromMins(dataTable[i].T_G_TIME_WIDTH),
                            
                     ]         
                   );
             }
             self.setState({dataTableGaz: rowsTableGaz});
         })       
                .catch(function (error) {
                })
                .finally(function () {
                                   });
    }
   
 
/*
    componentWillReceiveProps() {
        this.requestData();      
    } */

    render(){
     

        return (
    <div className={"my-global-div"} >
          <div id="artical">     <hr12>Обжиг N  {this.props.value1} </hr12>   </div> 
          <div className={"my-tableHeart-div"}>
                    { this.state && this.state.dataTableHeart&&<Chart
                    chartType="Table"
                    chartLanguage = 'ru'
                    rows={this.state.dataTableHeart}
                    columns={[       
                        { type: "number",label:  "Шаг" },
                        { type: "number",label:  "Режим нагрева" },
                        { type: "number",label:  "Температура" },
                        { type: "string",label:  "Время Шага" },
                    ]} 
                    width="500px"
                    height="100%"
                    
                    options={{
                        colors: ['#98719D', '#A0BD85', '#5DBAD9'],
                        showRowNumber: false,
                        allowHtml: true, 
                        width:"500px"
                    }}       
                    />}
                </div>
                <div className={"my-tableGaz-div"}>
                    { this.state && this.state.dataTableGaz&& <Chart
                    chartType="Table"
                    chartLanguage = 'ru'
                    rows={this.state.dataTableGaz}
                    columns={[       
                           

                            { type: "number",label:  "Шаг" },
                            { type: "number",label:  "Режим нагрева" },
                            { type: "number",label:  "Поток" },
                            { type: "string",label:  "Кислород" },
                            { type: "string",label:  "Время Шага" },


                    ]} 
                    width="500px"
                    height="100%"
                    options={{
                        colors: ['#98719D', '#A0BD85', '#5DBAD9'],
                        showRowNumber: false,
                        allowHtml: true, 
                        width:"500px"
                    }}       
                    />}
                </div> 
                <div>
             
             <p>  Номер Catch2 {this.props.value1}</p> 
           </div>        

        
   </div>
   );
    }
  }
  
export default TwoTablesRaisa;