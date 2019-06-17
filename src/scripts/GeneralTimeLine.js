

import React from 'react';
//import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import axios from 'axios';

import Linkify from 'react-linkify';
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




export class GeneralTimeLine extends React.Component{


    constructor(props) {
            super(props);
            this.state = { value1: "" };
            this.handleChange = this.handleChange.bind(this);
         
          }
        
          handleChange(event) {
            this.setState({ value: event.target.value });
          }

    requestDataRaisa (){
        const self = this;
        const data_url = 'http://172.16.20.75:8060/?generaltimeline=raisa';
        const data_url2 = 'http://172.16.20.75:8060/?generaltimeline=raisa2';
        const data_url3 = 'http://172.16.20.75:8060/?generaltimeline=fr05';
        const data_url4 = 'http://172.16.20.75:8060/?generaltimeline=fr06';
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
                                        'Раиса',
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
                                    
                                    ['Раиса',  
                                    dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                    '#003366',
                                    ReactDOMServer.renderToString(<HtmlToolTip 
                                        toolTipData={dataTimeLine[i]}
                                        toolTipType={"stop"}
                                      />),
                                    new Date(dataTimeLine[i].end_time),
                                    new Date(plus15Hours( new Date(dataTimeLine[i].end_time))),
                                 ],  
                                

                                 ['Раиса', 
                                 dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                 '#0080ff',
                                 ReactDOMServer.renderToString(<HtmlToolTip 
                                    toolTipData={dataTimeLine[i]}
                                    toolTipType={"start"}
                                    />)  ,	            
                                        new Date(minus15Hours( new Date(dataTimeLine[i].STARTUP_TIME))),
                                        new Date(dataTimeLine[i].STARTUP_TIME)
                               ],

                               ['Раиса',  
                               dataTimeLine[i].PROGRAM_NUMBER.toString(),
                               
                               dataTimeLine[i].pause  == '00:00:00' ? '#708090' :'#d9e6f2',
                               dataTimeLine[i].pause == '00:00:00' ?   ReactDOMServer.renderToString(
                                <HtmlToolTip 
                                  toolTipData={dataTimeLine[i+1]}
                                  toolTipType={"lost"}
                                />) :   ReactDOMServer.renderToString(
                                    <HtmlToolTip 
                                      toolTipData={dataTimeLine[i+1]}
                                      toolTipType={"pause"}
                                    />),
                                      plus15Hours(new Date(dataTimeLine[i].end_time)),		            
                                      minus15Hours(new Date(dataTimeLine[i+1].STARTUP_TIME))
                                    ]       
                                    );
                        }
                    }
                    self.setState({dateTimeLine: rowsTimeLine}); 
                    self.setState({minDate: minValue});
                })

                axios.get(data_url2)
                .then(function (response) {
                    const dataTimeLine=response.data[1];
                    const minValue=(Date.today().addMonths(-1));
           
                    for (let i = 0; i < dataTimeLine.length-1; i += 1) {
                        if (Date.compare(new Date(dataTimeLine[i].STARTUP_TIME),minValue)===1){  
                            rowsTimeLine.push(
                                [
                                        'Раиса2',
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
                                    ['Раиса2',  
                                    dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                    '#003366',
                                    ReactDOMServer.renderToString(<HtmlToolTip 
                                        toolTipData={dataTimeLine[i]}
                                        toolTipType={"stop"}
                                      />),
                                    new Date(dataTimeLine[i].end_time),
                                    new Date(plus15Hours( new Date(dataTimeLine[i].end_time))),
                                 ],  
                                 ['Раиса2', 
                                 dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                 '#0080ff',
                                 ReactDOMServer.renderToString(<HtmlToolTip 
                                    toolTipData={dataTimeLine[i]}
                                    toolTipType={"start"}
                                    />) ,	            
                                        new Date(minus15Hours( new Date(dataTimeLine[i].STARTUP_TIME))),
                                        new Date(dataTimeLine[i].STARTUP_TIME)
                               ],
                               ['Раиса2',  
                               ,
                               dataTimeLine[i].pause  == '00:00:00' ? '#708090' :'#d9e6f2',
                               dataTimeLine[i].pause == '00:00:00' ?   ReactDOMServer.renderToString(
                                <HtmlToolTip 
                                  toolTipData={dataTimeLine[i+1]}
                                  toolTipType={"lost"}
                                />) :   ReactDOMServer.renderToString(
                                    <HtmlToolTip 
                                      toolTipData={dataTimeLine[i+1]}
                                      toolTipType={"pause"}
                                    />),
                                      plus15Hours(new Date(dataTimeLine[i].end_time)),		            
                                      minus15Hours(new Date(dataTimeLine[i+1].STARTUP_TIME))
                                    ]  
                      );
                       }  
                    }
                    self.setState({dateTimeLine: rowsTimeLine}); 
                    self.setState({minDate: minValue});
                })
                axios.get(data_url3)
                .then(function (response) {
                    // handle success
                    const dataTimeLine=response.data[1];
                    const minValue=(Date.today().addMonths(-1));
                    for (let i = 0; i < dataTimeLine.length-1; i += 1) {
                        if (Date.compare(new Date(dataTimeLine[i].STARTUP_TIME),minValue)===1){
                            rowsTimeLine.push([
                                        'ФР05',
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
                                    ['ФР05',  
                                    dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                    '#003366',
                                    ReactDOMServer.renderToString(<HtmlToolTip 
                                        toolTipData={dataTimeLine[i]}
                                        toolTipType={"stop"}
                                      />),
                                    new Date(dataTimeLine[i].end_time),
                                    new Date(plus15Hours( new Date(dataTimeLine[i].end_time))),
                                 ],  
                                 ['ФР05', 
                                 dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                 '#0080ff',
                                 ReactDOMServer.renderToString(<HtmlToolTip 
                                    toolTipData={dataTimeLine[i]}
                                    toolTipType={"start"}
                                    />)  ,	            
                                        new Date(minus15Hours( new Date(dataTimeLine[i].STARTUP_TIME))),
                                        new Date(dataTimeLine[i].STARTUP_TIME)
                               ],
                               ['ФР05',  
                               dataTimeLine[i].PROGRAM_NUMBER.toString(), 
                               dataTimeLine[i].pause  == '00:00:00' ? '#708090' :'#d9e6f2',
                               dataTimeLine[i].pause == '00:00:00' ?   ReactDOMServer.renderToString(
                                <HtmlToolTip 
                                  toolTipData={dataTimeLine[i+1]}
                                  toolTipType={"lost"}
                                />) :   ReactDOMServer.renderToString(
                                    <HtmlToolTip 
                                      toolTipData={dataTimeLine[i+1]}
                                      toolTipType={"pause"}
                                    />),
                                      plus15Hours(new Date(dataTimeLine[i].end_time)),		            
                                      minus15Hours(new Date(dataTimeLine[i+1].STARTUP_TIME))
                                    ] 
                             );
                        }
                    }
                    self.setState({dateTimeLine: rowsTimeLine}); 
                    self.setState({minDate: minValue});
                })
                axios.get(data_url4)
                .then(function (response) {
                    const dataTimeLine=response.data;
                    const dataTable=response.data;
                    const minValue=(Date.today().addMonths(-1));
                    for (let i = 0; i < dataTimeLine.length-1; i += 1) {
                        if (Date.compare(new Date(dataTimeLine[i].STARTUP_TIME),minValue)===1){
                            rowsTimeLine.push([
                                        'FR06',
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
                                    ['FR06',  
                                    dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                    '#003366',
                                    ReactDOMServer.renderToString(<HtmlToolTip 
                                        toolTipData={dataTimeLine[i]}
                                        toolTipType={"stop"}
                                      />),
                                    new Date(dataTimeLine[i].end_time),
                                    new Date(plus15Hours( new Date(dataTimeLine[i].end_time))),
                                 ],  
                                 ['FR06', 
                                 dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                 '#0080ff',
                                 ReactDOMServer.renderToString(<HtmlToolTip 
                                    toolTipData={dataTimeLine[i]}
                                    toolTipType={"start"}
                                    />),	            
                                        new Date(minus15Hours( new Date(dataTimeLine[i].STARTUP_TIME))),
                                        new Date(dataTimeLine[i].STARTUP_TIME)
                               ],

                               ['FR06',  
                               dataTimeLine[i].PROGRAM_NUMBER.toString(),
                               dataTimeLine[i].pause  == '00:00:00' ? '#708090' :'#d9e6f2',
                               dataTimeLine[i].pause == '00:00:00' ?   ReactDOMServer.renderToString(
                                <HtmlToolTip 
                                  toolTipData={dataTimeLine[i+1]}
                                  toolTipType={"lost"}
                                />) :   ReactDOMServer.renderToString(
                                    <HtmlToolTip 
                                      toolTipData={dataTimeLine[i+1]}
                                      toolTipType={"pause"}
                                    />),
                                      plus15Hours(new Date(dataTimeLine[i].end_time)),		            
                                      minus15Hours(new Date(dataTimeLine[i+1].STARTUP_TIME))
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
        this.requestDataRaisa();      
      /*  this.requestDataRaisa2();      */
    }
    render(){
        return (
    <div className={"my-global-div"} >
     

     <div className={"my-timelineRaisa-div"}>
      { this.state && this.state.dateTimeLine &&<Chart
      chartType="Timeline"
      chartLanguage = 'ru'
      rows={this.state.dateTimeLine}
              columns={columns}
      width="100%"
      height="100%"
      options={{
         colors: ['#98719D', '#A0BD85', '#5DBAD9'],
       }}    
       
      

       />}
  </div>





   </div>
   );
    }
  }
  
export default GeneralTimeLine;