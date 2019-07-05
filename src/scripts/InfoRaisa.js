import React from 'react';
//import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import axios from 'axios';

import moment from 'moment';
import 'moment/locale/ru';
import GraphTest from './GraphTest';
import {NavLink} from 'react-router-dom';

import HtmlToolTip from './tooltip';
import './InfoRaisa.css';
import './style.css';

import TwoTablesRaisa from './TwoTablesRaisa';


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
    this.state = { valuePass: 10,
                    valueTwoTable: 10,
                    flag: true
                 };
    this.handleChange = this.handleChange.bind(this); 
    this.handleChangeTable = this.handleChangeTable .bind(this); 
  /*  this.handleSubmit = this.handleSubmit.bind(this); */ 
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
                                      
                                      dataTimeLine[i].currentWork <= 300  ? '#50D050' :'#b0d1f2',
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
                                 new Date(moment( dataTimeLine[i].end_time ).add(1, 'hours')),	
                                 new Date(moment( dataTimeLine[i+1].STARTUP_TIME ).subtract(1, 'hours'))	            
                               ] 

                              
                                  );
                      }
                  }
        
                    for (let i = 0; i < dataTable.length; i += 1) {
                        if (Date.compare(new Date(dataTable[i].STARTUP_TIME),minValue)===1){
                            rowsTable.push(
                                [
                                          moment(dataTable[i].STARTUP_TIME).locale("ru").format("YYYY  Do MMMM, h:mm:ss"),
                                          dataTable[i].PROGRAM_NUMBER,
                                          dataTable[i].PROGRAM_NAME,
                                          moment(dataTable[i].end_time).locale("ru").format("YYYY  Do MMMM, h:mm:ss"),
                                          dataTable[i].duration.toString(),
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
             this.setState({ 
              valuePass: value,
              flag:true
              });
                       }
         }


      ];
      
      chartEventsTable =[
     /*   {
        eventName: "select",
        callback  : ({chartWrapper}) => { 
              
               var selection = chartWrapper.getChart().getSelection();
               var value = chartWrapper.getDataTable().getValue(selection[0].row,1);    
               this.handleChange(value);
                }
           },*/
                            /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/ 
           {
            eventName: "select",
            callback  : ({chartWrapper}) => { 
                   var selection = chartWrapper.getChart().getSelection();
                   var valueTable = chartWrapper.getDataTable().getValue(selection[0].row,1);
                   console.log ( "Value", chartWrapper.getChart().getSelection());
                   console.log ( "ValueRow", chartWrapper.getDataTable().getValue(selection[0].row,4));
                  
                   this.handleChangeTable(valueTable);
                   this.setState({ valueTwoTable: valueTable,
                    flag:false
                 })
                    }
               }  
           
        ];


    handleChange(value) {
        this.setState({ 
                        valuePass: value,
                        flag:true
         });             
      }

      handleChangeTable(valueTable) {
          this.setState({ valueTwoTable: valueTable,
          flag:false
       });
      }
  


    render(){

      const takeValue = this.props.commonValue;
        return (
    <div className={"my-global-div"} >
          <div id="artical">     <hr12>Раиса</hr12>   </div> 
          <div className={"my-table-div"}>
                    { this.state && this.state.dataTable &&<Chart
                    chartType="Table"
                    chartLanguage = 'ru'
                    rows={this.state.dataTable}
                    columns={[ 
                        { type: 'string', label: 'Start' },
                        { type: "number",label:  "N обжига" },
                        { type: "string", label: "Название программы" },
                        { type: 'string', label: 'Stop' },
                        { type: "string", label: "Продолжительность" },
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
                        width:"100%"
                    }}  
                    chartEvents={this.chartEventsTable }

                    

                   /* formatters={[
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
                                     /* options: '<a href=/twoTablesRaisa?value1={0}>{0} </a>' ,  */
                       /*   {
                             type: 'PatternFormat',
                             column: [1],
                            options: '<a href=/twoTablesRaisa?value1={0}>{0} </a>' , 
                             
                             
                              /* options: '<NavLink to={/TwoTablesRaisa value1={0}>{0}  } </NavLink>', 
                            
                            

                             
                    }, 
                      
                   ]}
                  */
                    />}
                </div> 


     <div className={"my-timeline-div"}>
      { this.state && this.state.dateTimeLine &&<Chart
      chartType="Timeline"
      chartLanguage = 'ru'
      rows={this.state.dateTimeLine}
              columns={columns}
      width="1300px"
      height="100px"
      options={{
         colors: ['#98719D', '#A0BD85', '#5DBAD9'],
         width:"100%"
       }}    
      chartEvents={this.chartEvents }
                 
       />}
  </div>
        
        <div className={"my-graphRaisa-div"}>
      {  this.state.flag==true  && <GraphTest    commonValue={this.state}/> }
       </div>
 
        <div className={"my-graphRaisa-div"}>
      {  this.state.flag==false  &&       <TwoTablesRaisa    value1={this.state.valueTwoTable}/> }
        </div>


   </div>
   );
    }
  }
  
export default InfoRaisa;