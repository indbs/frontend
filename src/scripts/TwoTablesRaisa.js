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

export class TwoTablesRaisa extends React.Component{
    constructor(props) {
        super(props);        
     
    }

    requestData(){
        const self = this;
        const data_url = "http://172.16.20.75:8060/?heat_table=raisa&program_number=70&year=2019";

        const rowsTable= [];
        axios.get(data_url)
                .then(function (response) {
                
                    const dataTable=response.data;
                    const minValue=(Date.today().addMonths(-1));
                    for (let i = 0; i < dataTable.length; i += 1) {         
            
                            rowsTable.push(
                                [
                                    dataTable[i].STEP_NO,     
                                    dataTable[i].T_M_MODE,
                                    dataTable[i].T_M_TEMP,
                            
                                    moment.utc().add(155, 'minutes').format('hh:mm'),
                
                              
                            ]         
                          );
                        
                    }
                  
                    self.setState({dataTable: rowsTable});

                })
                .catch(function (error) {
                })
                .finally(function () {
                                   });
           
    }
   
    componentDidMount() {
      this.requestData();  
  }

    render(){
       
       
        
        return (
    <div className={"my-global-div"} >
          <div id="artical">     <hr12>Обжиг N </hr12>   </div> 
          <div className={"my-table-div"}>
                    { this.state && this.state.dataTable&& <Chart
                    chartType="Table"
                    chartLanguage = 'ru'
                    rows={this.state.dataTable}
                    columns={[       
                          
                            { type: "number",label:  "Шаг" },
                            { type: "number",label:  "Режим нагрева" },
                            { type: "number",label:  "Температура" },
                            { type: "string",label:  "Время Шага" },
                        
                    ]} 

                    width="100%"
                    height="100%"
                    options={{
                        colors: ['#98719D', '#A0BD85', '#5DBAD9'],
                        showRowNumber: true,
                        allowHtml: true, 
                        width:"100%"
                    }}       
                    />}
                </div> 
        
   </div>
   );
    }
  }
  
export default TwoTablesRaisa;