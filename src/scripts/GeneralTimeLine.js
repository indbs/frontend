

import React from 'react';
//import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import axios from 'axios';

import Linkify from 'react-linkify';
import HtmlToolTip from './tooltip';
var ReactDOMServer = require('react-dom/server');
require('datejs');  


function createCustomHTMLContentRaisa(numb,duration,Temperaure, SP, Power) {
    var  A='<div class="block1">   '+
      '<table padding = 10   cellpadding=1 cellspacing=0 border=0 > ' + '<tr>' +
      '<td><h4 class = "leftTitle">'+ 'Обжиг №' + numb+'</h4></td >' + '</tr>' + '<tr>' +
      '<td><hr6>'+ 'Temperaure: '+'</hr6>' +'<hr5 class ="righTableInfo">'  + Temperaure +'</hr5></td>' + '</tr>' + '<tr>' +
      '<td><hr6>'+ 'SP: '+'</hr6>' +'<hr5 class ="righTableInfo">'  + SP +'</hr5></td>' + '</tr>' + '<tr padding = 0>' +
      '<td><hr6>'+ 'Power: '+'</hr6>' +'<hr5 class ="righTableInfo">'  + Power +'</hr5></td>' + '</tr>' + '<tr padding = 0>' +
      '<td><hr6>'+ 'Длительность: ' +'</hr6>' +'<hr5 class ="righTableInfo">'+ duration+ ' часов' +'</hr5></td padding = 0>' + '</tr>' + '</table>' + '</div>';
return A;}

function createCustomHTMLContentFR06(numb,duration,Temperaure, SP, Power) {
    var  A='<div class="block1">   '+
      '<table padding = 10   cellpadding=1 cellspacing=0 border=0 > ' + '<tr>' +
      '<td><h4 class = "leftTitle">'+ 'Обжиг №' + numb+'</h4></td >' + '</tr>' + '<tr>' +

      '<td><hr6>'+ 'Длительность: ' +'</hr6>' +'<hr5 class ="righTableInfo">'+ duration+ ' часов' +'</hr5></td padding = 0>' + '</tr>' + '</table>' + '</div>';
return A;}

function createCustomHTMLContentRaisa2(numb,waterQuant,VAh,Wth,duration) {
    var A='<div class="block1">   '+
    '<table padding = 10   cellpadding=1 cellspacing=0 border=0 > ' + '<tr>' +
    '<td><h4 class = "leftTitle">'+ 'Обжиг №' + numb+'</h4></td >' + '</tr>' + '<tr>' +
    '<td><hr6>'+ 'Уровень воды: '+'</hr6>' +'<hr5 class ="righTableInfo">'  + waterQuant +'</hr5></td>' + '</tr>' + '<tr>' +
    
    '<td><hr6>'+ 'Потребление ВА: '+'</hr6>' +'<hr5 class ="righTableInfo">'  + VAh +'</hr5></td>' + '</tr>' + '<tr>' +
    '<td><hr6>'+ 'Потребление Вт: '+'</hr6>' +'<hr5 class ="righTableInfo">'  + Wth +'</hr5></td>' + '</tr>' + '<tr padding = 0>' +
    '<td><hr6>'+ 'Длительность: ' +'</hr6>' +'<hr5 class ="righTableInfo">'+ duration+ ' часов' +'</hr5></td padding = 0>' + '</tr>' + '</table>' + '</div>';
return A;}

function createCustomHTMLContentFR05(numb,duration,Temperaure, SP, Power) {
    var  A='<div class="block1">   '+
      '<table padding = 10   cellpadding=1 cellspacing=0 border=0 > ' + '<tr>' +
      '<td><h4 class = "leftTitle">'+ 'Обжиг №' + numb+'</h4></td >' + '</tr>' + '<tr>' +

      '<td><hr6>'+ 'Temperaure: '+'</hr6>' +'<hr5 class ="righTableInfo">'  + Temperaure +'</hr5></td>' + '</tr>' + '<tr>' +
      '<td><hr6>'+ 'SP: '+'</hr6>' +'<hr5 class ="righTableInfo">'  + SP +'</hr5></td>' + '</tr>' + '<tr padding = 0>' +
      '<td><hr6>'+ 'Power: '+'</hr6>' +'<hr5 class ="righTableInfo">'  + Power +'</hr5></td>' + '</tr>' + '<tr padding = 0>' +
      '<td><hr6>'+ 'Длительность: ' +'</hr6>' +'<hr5 class ="righTableInfo">'+ duration+ ' часов' +'</hr5></td padding = 0>' + '</tr>' + '</table>' + '</div>';
return A;}


function createCustomHTMLContent2(stTime) {
var      A='<div class="block1">'+
'<table   cellpadding=2 cellspacing=0 border=0> ' + '<tr>' +
'<td><hr6>'+ 'Остановка: '+'</hr6>' +'<hr5 class ="righTableInfo">' +stTime.toLocaleDateString('RU') +' в ' +stTime.toLocaleTimeString('RU') +'</hr5 class ="righTableInfo></td>' + '</tr>' + '</table>' + '</div>';
return A;}

function createCustomHTMLContent3(pause) {
var  A='<div class="block1">'+
'<table   cellpadding=1 cellspacing=0 border=0> ' + '<tr>' +
'<td><hr6>'+ 'Ожидание: ' + '</hr6>'+'<hr5 class ="righTableInfo">' +pause  +'</hr5></td>' + '</tr>' + '</table>' + '</div>';
return A;}

function createCustomHTMLContent4(strTime) {
var   A='<div class="block1">'+
'<table   cellpadding=1 cellspacing=0 border=0> ' + '<tr>' +
'<td><hr6>'+ 'Запуск: ' +'</hr6>' + '<hr5 class ="righTableInfo">'+strTime.toLocaleDateString('RU') +' в ' +strTime.toLocaleTimeString('RU') +'</hr5></td>' + '</tr>' + '</table>' + '</div>';
return A;}

function parsingToDate(inputDate) {
           var dateStr=inputDate;
           var a=dateStr.split(" ");
           var d=a[0].split("-");
           var t=a[1].split(":");
           var date = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);
       return date;}

 function ParseDateLocale(inputDate) {

     var dateStr=inputDate;
         var a=dateStr.split(" ");
         var d=a[0].split("-");
         var t=a[1].split(":");
         var date = new Date(d[0],(d[1]-1),d[2],t[0],t[1]);

       document.write(date.toLocaleDateString('RU') + ' время ' +date.toLocaleTimeString('RU'));
   }

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
                                         createCustomHTMLContentRaisa(
                                            dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                            dataTimeLine[i].PROGRAM_NAME.toString(), 
                                            dataTimeLine[i].duration.toString(), 
                                            dataTimeLine[i].powerVAh.toString(),
                                            dataTimeLine[i].powerkWh.toString(),
                                            ),
                                        new Date(dataTimeLine[i].STARTUP_TIME),
                                        new Date(dataTimeLine[i].end_time)
                                    ],
                                    
                                    ['Раиса',  
                                    dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                    '#003366',
                                    createCustomHTMLContent2(
                                        new Date(dataTimeLine[i].end_time)
                                        ),
                                    new Date(dataTimeLine[i].end_time),
                                    new Date(plus15Hours( new Date(dataTimeLine[i].end_time))),
                                 ],  
                                

                                 ['Раиса', 
                                 dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                 '#0080ff',
                                 createCustomHTMLContent4( new Date(dataTimeLine[i].STARTUP_TIME) ) ,	            
                                        new Date(minus15Hours( new Date(dataTimeLine[i].STARTUP_TIME))),
                                        new Date(dataTimeLine[i].STARTUP_TIME)
                               ],

                               ['Раиса',  
                               dataTimeLine[i].PROGRAM_NUMBER.toString(),
                               
                               dataTimeLine[i].pause  == '00:00:00' ? '#708090' :'#d9e6f2',
                               dataTimeLine[i].pause == '00:00:00' ? createCustomHTMLContent3('Возможная потеря данных') : createCustomHTMLContent3(dataTimeLine[i+1].pause),
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
                                         createCustomHTMLContentRaisa2(
                                            dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                            dataTimeLine[i].waterQuant.toString(),
                                            dataTimeLine[i].powerVAh.toString(),
                                            dataTimeLine[i].powerkWh.toString(),
                                            dataTimeLine[i].duration.toString()
                                            ),
                                        new Date(dataTimeLine[i].STARTUP_TIME),
                                        new Date(dataTimeLine[i].end_time)
                                    ],
                                    ['Раиса2',  
                                    dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                    '#003366',
                                    createCustomHTMLContent2(
                                        new Date(dataTimeLine[i].end_time)
                                        ),
                                    new Date(dataTimeLine[i].end_time),
                                    new Date(plus15Hours( new Date(dataTimeLine[i].end_time))),
                                 ],  
                                 ['Раиса2', 
                                 dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                 '#0080ff',
                                 createCustomHTMLContent4( new Date(dataTimeLine[i].STARTUP_TIME) ) ,	            
                                        new Date(minus15Hours( new Date(dataTimeLine[i].STARTUP_TIME))),
                                        new Date(dataTimeLine[i].STARTUP_TIME)
                               ],
                               ['Раиса2',  
                               ,
                               dataTimeLine[i].pause  == '00:00:00' ? '#708090' :'#d9e6f2',
                               dataTimeLine[i].pause == '00:00:00' ? createCustomHTMLContent3('Возможная потеря данных') : createCustomHTMLContent3(dataTimeLine[i+1].pause),
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
                                         createCustomHTMLContentFR05(
                                            dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                            dataTimeLine[i].TEMPERATURE.toString(), 
                                            dataTimeLine[i].SP.toString(),
                                            dataTimeLine[i].OUTPUT_POWER.toString(),
                                            dataTimeLine[i].duration.toString()
                                            ),
                                        new Date(dataTimeLine[i].STARTUP_TIME),
                                        new Date(dataTimeLine[i].end_time)
                                    ],
                                    ['ФР05',  
                                    dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                    '#003366',
                                    createCustomHTMLContent2(
                                        new Date(dataTimeLine[i].end_time)
                                        ),
                                    new Date(dataTimeLine[i].end_time),
                                    new Date(plus15Hours( new Date(dataTimeLine[i].end_time))),
                                 ],  
                                 ['ФР05', 
                                 dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                 '#0080ff',
                                 createCustomHTMLContent4( new Date(dataTimeLine[i].STARTUP_TIME) ) ,	            
                                        new Date(minus15Hours( new Date(dataTimeLine[i].STARTUP_TIME))),
                                        new Date(dataTimeLine[i].STARTUP_TIME)
                               ],
                               ['ФР05',  
                               dataTimeLine[i].PROGRAM_NUMBER.toString(), 
                               dataTimeLine[i].pause  == '00:00:00' ? '#708090' :'#d9e6f2',
                               dataTimeLine[i].pause == '00:00:00' ? createCustomHTMLContent3('Возможная потеря данных') : createCustomHTMLContent3(dataTimeLine[i+1].pause),
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
                                        createCustomHTMLContentFR06(
                                            dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                            dataTimeLine[i].duration.toString()
                                            ),
                                        new Date(dataTimeLine[i].STARTUP_TIME),
                                        new Date(dataTimeLine[i].end_time)
                                    ],
                                    ['FR06',  
                                    dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                    '#003366',
                                    createCustomHTMLContent2(
                                        new Date(dataTimeLine[i].end_time)
                                        ),
                                    new Date(dataTimeLine[i].end_time),
                                    new Date(plus15Hours( new Date(dataTimeLine[i].end_time))),
                                 ],  
                                 ['FR06', 
                                 dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                 '#0080ff',
                                 createCustomHTMLContent4( new Date(dataTimeLine[i].STARTUP_TIME) ) ,	            
                                        new Date(minus15Hours( new Date(dataTimeLine[i].STARTUP_TIME))),
                                        new Date(dataTimeLine[i].STARTUP_TIME)
                               ],

                               ['FR06',  
                               dataTimeLine[i].PROGRAM_NUMBER.toString(),
                               dataTimeLine[i].pause  == '00:00:00' ? '#708090' :'#d9e6f2',
                               dataTimeLine[i].pause == '00:00:00' ? createCustomHTMLContent3('Возможная потеря данных') : createCustomHTMLContent3(dataTimeLine[i+1].pause),
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