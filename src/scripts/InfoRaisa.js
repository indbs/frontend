import React from 'react';
//import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import axios from 'axios';

import GraphRaisa from './GraphRaisa';
import GraphTest from './GraphTest';
import Linkify from 'react-linkify';

require('datejs');  


function createCustomHTMLContent(numb,duration,Temperaure, SP, Power) {
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
                                         createCustomHTMLContent(
                                            dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                            dataTimeLine[i].PROGRAM_NAME.toString(), 
                                            dataTimeLine[i].duration.toString(), 
                                            dataTimeLine[i].powerVAh.toString(),
                                            dataTimeLine[i].powerkWh.toString(),
                                            ),
                                        new Date(dataTimeLine[i].STARTUP_TIME),
                                        new Date(dataTimeLine[i].end_time)
                                    ],
                                    
                                    ['1',  
                                    dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                    '#003366',
                                    createCustomHTMLContent2(
                                        new Date(dataTimeLine[i].end_time)
                                        ),
                                    new Date(dataTimeLine[i].end_time),
                                    new Date(plus15Hours( new Date(dataTimeLine[i].end_time))),
                                 ],  
                                

                                 ['1', 
                                 dataTimeLine[i].PROGRAM_NUMBER.toString(),
                                 '#0080ff',
                                 createCustomHTMLContent4( new Date(dataTimeLine[i].STARTUP_TIME) ) ,	            
                                        new Date(minus15Hours( new Date(dataTimeLine[i].STARTUP_TIME))),
                                        new Date(dataTimeLine[i].STARTUP_TIME)
                               ],

                               ['1',  
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
                    console.log( rowsTimeLine);
                    self.setState({minDate: minValue});
                    
                    /* self.setState({dataTable: rows}); */
                    self.setState({dataTable: rowsTable});
                    //self.setState({dataTable: columns});
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

    render(){
        return (
    <div className={"my-global-div"} >
         
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
                          options: <Linkify>
                           <a href='GraphRaisa value1={0}>{0}'>
                              
                           </a>.
                         </Linkify>, 
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