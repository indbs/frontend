import React from 'react';
//import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ru';

import HtmlToolTip from './tooltip';
var ReactDOMServer = require('react-dom/server');

require('datejs');  




 function plus15Hours (timeValue ) {
         var dateStr=timeValue;
         var date = new Date(  timeValue.setMilliseconds(0.1 * 60 * 60 * 1000));
     return date; }

 function plus30Hours (timeValue ) {
           var dateStr=timeValue;
         var date = new Date(  timeValue.setMilliseconds(0.30 * 60 * 60 * 1000));
     return date; }

 function minus15Hours (timeValue ) {
           var dateStr=timeValue;
         var date = new Date(  timeValue.setMilliseconds(-0.1 * 60 * 60 * 1000));
     return date; }

 function minus30Hours (timeValue ) {
         var dateStr=timeValue;
         var date = new Date(  timeValue.setMilliseconds(-0.3 * 60 * 60 * 1000));
     return date; }

const columns = [
    { type: "string", id: "Role" },
    { type: "string", id: "Name" },
    { type: "string", id: 'style', role: 'style' },
    { type: 'string', role: 'tooltip','p': {'html': true}},
    { type: 'date', id: 'Start' },
    { type: 'date', id: 'Stop' }
  ];

export class InfoFR06 extends React.Component{
    requestData(){
        const self = this;
        const data_url = 'http://172.16.20.75:8060/?generaltimeline=fr06';
        const rowsTimeLine= [];
        const rowsTable= [];
        axios.get(data_url)
                .then(function (response) {
                    const dataTimeLine=response.data;
                    const dataTable=response.data;
                    const minValue=(Date.today().addMonths(-1));
                    for (let i = 0; i < dataTimeLine.length-1; i += 1) {
                        if (Date.compare(new Date(dataTimeLine[i].STARTUP_TIME),minValue)===1){
                            rowsTimeLine.push([
                                        '1',
                                        dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                        '#b0d1f2',
                                        ReactDOMServer.renderToString(
                                            <HtmlToolTip 
                                              toolTipData={dataTable[i]}
                                              toolTipType={"full"}
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
                                  />), 	            
                                  new Date(moment( dataTimeLine[i].STARTUP_TIME ).subtract(1, 'hours')),
                                        new Date(dataTimeLine[i].STARTUP_TIME)
                               ],
                               ['1',  
                               dataTimeLine[i].PROGRAM_NUMBER.toString(), 
                               dataTimeLine[i].pause  == '00:00:00' ? '#708090' :'#d9e6f2',
                               dataTimeLine[i].pause == '00:00:00' ?   ReactDOMServer.renderToString(
                                <HtmlToolTip 
                                  toolTipData={dataTable[i+1]}
                                  toolTipType={"lost"}
                                />) :   ReactDOMServer.renderToString(
                                    <HtmlToolTip 
                                      toolTipData={dataTable[i+1]}
                                      toolTipType={"pause"}
                                    />),
                                     
                                      new Date(moment( dataTimeLine[i].end_time ).add(1, 'hours')),	
                                      new Date(moment( dataTimeLine[i+1].STARTUP_TIME ).subtract(1, 'hours'))	            
                                      
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
                                         new Date(dataTable[i].end_time),
                                         dataTable[i].duration.toString()
                            ]         
                          );
                        }
                    }
                    self.setState({dateTimeLine: rowsTimeLine}); 
                    self.setState({dataTable: rowsTable});
                    self.setState({minDate: minValue});
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    
                });     
    }

    componentDidMount() {
        this.requestData();      
    }

    handleChange(value) {
        this.setState({ valuePass: value });
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
        return (
            <div className={"my-global-div"} >
             <div className={"my-table-div"}>
                            { this.state && this.state.dataTable &&<Chart
                            chartType="Table"
                            chartLanguage = 'ru'
                            rows={this.state.dataTable}
                            columns={[       
                                { type: 'date',  label: 'Start' },
                                { type: "number", label:  "N обжига" },
                                { type: 'date', label: 'Stop' },
                                { type: "string", label: "Продолжительность" },
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
                        
                       chartEvents={[this.chartEvents]} 
           />}
          </div>
           </div>
           );
            }
   }
export default InfoFR06;