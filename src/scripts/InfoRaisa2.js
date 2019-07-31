import React from 'react';
//import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import axios from 'axios';
import HtmlToolTip from './tooltip';
import Linkify from 'react-linkify';
import moment from 'moment';
import 'moment/locale/ru';
import GraphRaisa2 from './GraphRaisa2';
import { connect } from 'react-redux';


import {addToDo } from '../actions/actions';

import {addTodo} from '../actions/actions';


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
export class InfoRaisa2 extends React.Component{
  
  
  constructor(props) {
    super(props);
    this.state = { valuePass: this.props.lastBorn };
    this.handleChange = this.handleChange.bind(this);
    
   /* this.handleSubmit = this.handleSubmit.bind(this);*/
}

  handleChange(value) {
    this.setState({ valuePass: value });
  }


    requestData(){
        const self = this;
        const data_url = 'http://172.16.20.75:8060/?generaltimeline=raisa2';
        const rowsTimeLine= [];
        const rowsTable= [];
        axios.get(data_url)
                .then(function (response) {
                    // handle success
                    const dataTable=response.data[1];
                    const dataTimeLine=response.data[1];
                    const minValue=(Date.today().addMonths(-1));
                    for (let i = 0; i < dataTable.length; i += 1) {
                        
                            rowsTable.push(
                                [
                                          moment(dataTable[i].STARTUP_TIME).locale("ru").format("YYYY  Do MMMM, h:mm:ss"),
                                          dataTable[i].PROGRAM_NUMBER,
                                          moment(dataTable[i].end_time).locale("ru").format("YYYY  Do MMMM, h:mm:ss"),
                                         dataTable[i].duration.toString(),
                                         dataTable[i].n2.toString(),
                                         dataTable[i].waterQuant.toString(),
                                         dataTable[i].powerVAh.toString(),
                                         dataTable[i].powerkWh.toString()    
                            ]         
                          ); 
                    }
                    for (let i = 0; i < dataTimeLine.length; i += 1) {
                        if(i < dataTimeLine.length -1 ) {
                            rowsTimeLine.push(
                                [
                                        '1',
                                        dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                        dataTimeLine[i].currentWork <= 300  ? '#50D050' :'#b0d1f2',
                                        ReactDOMServer.renderToString(
                                            <HtmlToolTip 
                                              toolTipData={dataTable[i]}
                                              toolTipType={"fullraisa2"}
                                            />),
                                        new Date(dataTimeLine[i].STARTUP_TIME),
                                        new Date(dataTimeLine[i].end_time)
                                    ],
                                    ['1',  
                                    dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                    '#003366',
                                    ReactDOMServer.renderToString(<HtmlToolTip 
                                        toolTipData={dataTable[i]}
                                        toolTipType={"stop"}
                                      />),
                                    new Date(dataTimeLine[i].end_time),
                                    new Date(moment( dataTimeLine[i].end_time ).add(1, 'hours')),
                                 ],  
                                 ['1', 
                                 dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                 '#0080ff',
                                 ReactDOMServer.renderToString(<HtmlToolTip 
                                    toolTipData={dataTable[i]}
                                    toolTipType={"start"}
                                    />) ,	            
                                        new Date(moment( dataTimeLine[i].STARTUP_TIME ).subtract(1, 'hours')),
                                        new Date(dataTimeLine[i].STARTUP_TIME)
                               ],
                               [ '1',
                                ' ', 
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

                            } else {  rowsTimeLine.push(
                              [
                                      '1',
                                      dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                      dataTimeLine[i].currentWork <= 300  ? '#50D050' :'#b0d1f2',
                                      ReactDOMServer.renderToString(
                                          <HtmlToolTip 
                                            toolTipData={dataTable[i]}
                                            toolTipType={"fullraisa2"}
                                          />),
                                      new Date(dataTimeLine[i].STARTUP_TIME),
                                      new Date(dataTimeLine[i].end_time)
                                  ],
                                  ['1',  
                                  dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                  '#003366',
                                  ReactDOMServer.renderToString(<HtmlToolTip 
                                      toolTipData={dataTable[i]}
                                      toolTipType={"stop"}
                                    />),
                                  new Date(dataTimeLine[i].end_time),
                                  new Date(moment( dataTimeLine[i].end_time ).add(1, 'hours')),
                               ],  
                               ['1', 
                               dataTimeLine[i].PROGRAM_NUMBER.toString(),
                               '#0080ff',
                               ReactDOMServer.renderToString(<HtmlToolTip 
                                  toolTipData={dataTable[i]}
                                  toolTipType={"start"}
                                  />) ,	            
                                      new Date(moment( dataTimeLine[i].STARTUP_TIME ).subtract(1, 'hours')),
                                      new Date(dataTimeLine[i].STARTUP_TIME)
                             ],
                    );
                            } 
                     } 
                    self.setState({dateTimeLine: rowsTimeLine}); 
                    self.setState({dataTable: rowsTable});
                    self.setState({minDate: minValue});
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

      handleSubmitFR05 = (e) => {
        console.log("hello 2123");
        alert("hju");
        this.props.onTodoClick(); 

    console.log("after CHANGE_VALUES");
  
    alert("hju");

      }
     

    render(){
     return (
      <div className={"my-global-div"} >
       <div id="artical">     
          <hr12>Раиса2 + {this.props.lastBorn}</hr12>   
        </div>
     <div className={"my-table-div"}>
                            { this.state && this.state.dataTable &&<Chart
                            chartType="Table"
                            chartLanguage = 'ru'
                            rows={this.state.dataTable}
                            columns={[       
                                    { type: 'string', label: 'Start' },
                                    { type: "number",label:  "N обжига" },
                                    { type: 'string', label: 'Stop' },
                                    { type: "string", label: "Продолжительность" },
                                    { type: "string", label: "Азот" },
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
                            formatters={[
                             {
                                 type: 'PatternFormat',
                                 column: [1],
                                 options: '<a href=GraphRaisa value1={0}>{0} </a>' ,  
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
                        width="1200px"
                        height="100px"
                        options={{
                            colors: ['#98719D', '#A0BD85', '#5DBAD9'],
                            width:"100%"
                        }}    
                        chartEvents={this.chartEvents }
           />}
          </div>
          <div className={"my-graphRaisa-div"}>
             <GraphRaisa2    commonValueRaisa2={this.state}/>
          </div>
          <form form onSubmit={this.handleSubmitFR05}>
      <button>
          Меню store FR05
      </button>
    </form>


     </div>
        

        );
    }
   }
          

   const mapStateToProps = function(state) {
    return {
      windowTables: state.reduxValues[0].windowTables,
      windowGraphic: state.reduxValues[0].windowGraphic,
      id: state.reduxValues[0].id,
      selcted_oven:state.reduxValues[0].selcted_oven,
      selectedBorn: state.reduxValues[0].selectedBorn,
      lastBorn: state.reduxValues[0].lastBorn
    }
  }

/*
  const mapDispatchToProps = {
    addToDo
  }
*/

  const mapDispatchToProps = dispatch => {
    alert("Hello2");
    console.log("hello 2");
    return {
      onTodoClick: () => { // handles onTodoClick prop's call here
        dispatch(addTodo())
      }
      
    }

    
  }

  export default connect(mapStateToProps,{mapDispatchToProps})(InfoRaisa2);