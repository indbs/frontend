import React from 'react';
//import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import axios from 'axios';

import moment from 'moment';
import 'moment/locale/ru';
import GraphTest from './GraphTest';
import Linkify from 'react-linkify';

import HtmlToolTip from './tooltip';
var ReactDOMServer = require('react-dom/server');
require('datejs');  

const columns = [
    { type: "string", id: "Role" },
    { type: "string", id: "Name" },
    { type: "string", id: 'style', role: 'style' },
    { type: 'string', role: 'tooltip','p': {'html': true}},
    { type: 'date', id: 'Start' },
    { type: 'date', id: 'Stop' }
  ];



//google.charts.load('current', {'packages':['table', 'gauge' ,'controls', 'timeline'],'language': 'ru'});
export class InfoRaisa extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = { valuePass: "12" };
    this.handleChange = this.handleChange.bind(this);
    
   /* this.handleSubmit = this.handleSubmit.bind(this);*/
}

  handleChange(value) {
    this.setState({ valuePass: value });
  }

    requestData(){
        const self = this;
        const data_url = 'http://172.16.20.75:8060/?generaltimeline=raisa';
        const  rowsTable=[];
        const  rowsTimeLine=[];
        axios.get(data_url)
                .then(function (response) {
                    // handle success
                    const dataTable=response.data[1];
                    const dataTimeLine=response.data[1];
                    const minValue=(Date.today().addMonths(-1));
                    for (let i = 0; i < dataTimeLine.length-1; i += 1) {
                      if (Date.compare(new Date(dataTimeLine[i].STARTUP_TIME),minValue)===1){
                          rowsTimeLine.push([
                                      '1',
                                      dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                      '#b0d1f2',
                                      ReactDOMServer.renderToString(
                                          <HtmlToolTip 
                                            toolTipData={dataTimeLine[i]}
                                            toolTipType={"full"}
                                          />),
                                      new Date(dataTimeLine[i].STARTUP_TIME),
                                      new Date(dataTimeLine[i].end_time)
                                  ],
                                  
                                  ['1',  
                                  dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                  '#003366',
                                  ReactDOMServer.renderToString(<HtmlToolTip 
                                      toolTipData={dataTimeLine[i]}
                                      toolTipType={"stop"}
                                    />),
                                  new Date(dataTimeLine[i].end_time),
                                  new Date(moment( dataTimeLine[i].end_time ).add(0.1, 'hours')),
                               ],  
                              

                               ['1', 
                               dataTimeLine[i].PROGRAM_NUMBER.toString(),
                               '#0080ff',
                               ReactDOMServer.renderToString(<HtmlToolTip 
                                  toolTipData={dataTimeLine[i]}
                                  toolTipType={"start"}
                                  />)  ,	            
                                      new Date(moment( dataTimeLine[i].STARTUP_TIME ).subtract(0.1, 'hours')),
                                      new Date(dataTimeLine[i].STARTUP_TIME)
                             ],

                             ['1',  ' '
                             ,
                             
                             dataTimeLine[i].pause  === '00:00:00' ? '#708090' :'#d9e6f2',
                             dataTimeLine[i].pause === '00:00:00' ?   ReactDOMServer.renderToString(
                              <HtmlToolTip 
                                toolTipData={dataTimeLine[i+1]}
                                toolTipType={"lost"}
                              />) :   ReactDOMServer.renderToString(
                                  <HtmlToolTip 
                                    toolTipData={dataTimeLine[i+1]}
                                    toolTipType={"pause"}
                                  />),
                                  new Date(moment( dataTimeLine[i].end_time ).add(0.1, 'hours')),	
                                  new Date(moment( dataTimeLine[i+1].STARTUP_TIME ).subtract(0.1, 'hours'))	  
                                  ]       
                                  );
                      }
                  }
        
                    for (let i = 0; i < dataTable.length-1; i += 1) {
                        if (Date.compare(new Date(dataTable[i].STARTUP_TIME),minValue)===1){
                            rowsTable.push(
                                [
                                         new Date(dataTable[i].STARTUP_TIME),
                                         dataTable[i].PROGRAM_NUMBER,
                                         dataTable[i].PROGRAM_NAME,
                                         new Date(dataTable[i].end_time),
                                         dataTable[i].duration.toString(),
                             
                                         dataTable[i].heat_st.toString(),
                                         dataTable[i].gas_st.toString(),
                                         dataTable[i].waterQuant.toString(),
                                         dataTable[i].powerVAh.toString(),
                                         dataTable[i].powerkWh.toString()    
                            ]         
                          );
                        }
                    }
                    self.setState({dateTimeLine: rowsTimeLine}); 
                    self.setState({minDate: minValue});
                    self.setState({dataTable: rowsTable});
                  
       

                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
    }

    componentDidMount() {
        this.requestData();      
   
    }

    chartEvents =[
      {
      eventName: "select",
      callback  : ({chartWrapper}) => { 
             var selection = chartWrapper.getChart().getSelection();
             var value = chartWrapper.getDataTable().getValue(selection[0].row,1);     
             this.handleChange(value);
              }
         }
      ];

    render(){

      const takeValue = this.props.commonValue;
        return (
    <div className={"my-global-div"} >
           <div className={"my-table-div"}>
                <button onclick="activateLasers()">
                     Последние 5
                </button>

           </div>

         
         <div className={"my-table-div"}>
                    { this.state && this.state.dataTable &&<Chart
                    chartType="Table"
                    chartLanguage = 'ru'
                    rows={this.state.dataTable}
                    columns={[ 
                        { type: 'date', label: 'Start' },
                        { type: "number",label:  "N обжига" },
                        { type: "string", label: "Название программы" },
                        { type: 'date', label: 'Stop' },
                        { type: "string", label: "Продолжительность" },
                        { type: "string", label: "Температура" },
                        { type: "string", label: "Газ" },
                        { type: "string", label: "Вода" },
                        { type: "string", label: "Полная мощность" },
                        { type: "string", label: "Активная мощность" },
                    ]}    
                    
                    width="100%"
                    height="100%"
                    options={{
                        colors: ['#98719D', '#A0BD85', '#5DBAD9'],
                        showRowNumber: true,
                        allowHtml: true, 
                    }}  
                    formatters={[
                     {
                       type: 'PatternFormat',
                       column: [2,1],
                       options: '<a href=http://172.16.20.75:8080/GeneralTimeLine/TwoTablesServlet?program_number={1}>{0}</a>',
                     },
                 
                    /* {
                         type: 'PatternFormat',
                         column: [1],
                         options: '<a href=GraphRaisa value1={0}>{0} </a>' ,   
                          path: "/GraphRaisa",
                          query: {value1:7},
                        },*/
                   
                          {
                             type: 'PatternFormat',
                             column: [1],
                             options: '<a href=GraphRaisa%20?value1={0}>{0} </a>' , 
                          },  
                      
                   ]}
             
                    />}
                </div> 


     <div className={"my-timeline-div"}>
      { this.state && this.state.dateTimeLine &&<Chart
      chartType="Timeline"
      chartLanguage = 'ru'
      rows={this.state.dateTimeLine}
              columns={columns}
      width="100%"
      height="100px"
      options={{
         colors: ['#98719D', '#A0BD85', '#5DBAD9'],
       }}    
      chartEvents={this.chartEvents }
                 
       />}
  </div>
        <div className={"my-graphRaisa-div"}>
              
        <GraphTest    commonValue={this.state}/>
           
        </div>
   </div>
   );
    }
  }
  
export default InfoRaisa;