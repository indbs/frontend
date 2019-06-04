import React from 'react';
//import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import axios from 'axios';



require('datejs');  


function createCustomHTMLContent(numb,duration,Temperaure, SP, Power) {
    var  A='<div class="block1">   '+
      '<table padding = 10   cellpadding=1 cellspacing=0 border=0 > ' + '<tr>' +
      '<td><h4 class = "leftTitle">'+ 'Обжиг №' + numb+'</h4></td >' + '</tr>' + '<tr>' +

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

  const columnsTable = [
    { type: 'date', name: 'Start' },
    { type: "number",name:  "N обжига" },
    { type: 'date', name: 'Stop' },
    { type: "string", name: "Продолжительность" },
   
  ];


//google.charts.load('current', {'packages':['table', 'gauge' ,'controls', 'timeline'],'language': 'ru'});
export class TimeLineFR06 extends React.Component{

    
    requestData(){
        const self = this;
        const data_url = 'http://172.16.20.75:8060/?generaltimeline=fr06';
        const rows=[];
        axios.get(data_url)
                .then(function (response) {
                    // handle success
                    const dataTable=response.data;
                    const minValue=(Date.today().addMonths(-1));
                    for (let i = 0; i < dataTable.length-1; i += 1) {
                        if (Date.compare(new Date(dataTable[i].STARTUP_TIME),minValue)===1){
                            rows.push([
                                        '1',
                                        dataTable[i].PROGRAM_NUMBER.toString(),
                                        '#b0d1f2',
                                         createCustomHTMLContent(
                                            dataTable[i].PROGRAM_NUMBER.toString(),
                                            dataTable[i].duration.toString()
                                            ),
                                        new Date(dataTable[i].STARTUP_TIME),
                                        new Date(dataTable[i].end_time)
                                    ],
                                    
                                    ['1',  
                                    dataTable[i].PROGRAM_NUMBER.toString(),
                                    '#003366',
                                    createCustomHTMLContent2(
                                        new Date(dataTable[i].end_time)
                                        ),
                                    new Date(dataTable[i].end_time),
                                    new Date(plus15Hours( new Date(dataTable[i].end_time))),
                                 ],  
                                

                                 ['1', 
                                 dataTable[i].PROGRAM_NUMBER.toString(),
                                 '#0080ff',
                                 createCustomHTMLContent4( new Date(dataTable[i].STARTUP_TIME) ) ,	            
                                        new Date(minus15Hours( new Date(dataTable[i].STARTUP_TIME))),
                                        new Date(dataTable[i].STARTUP_TIME)
                               ],

                               ['1',  
                               dataTable[i].PROGRAM_NUMBER.toString(),
                               
                               dataTable[i].pause  == '00:00:00' ? '#708090' :'#d9e6f2',
                               dataTable[i].pause == '00:00:00' ? createCustomHTMLContent3('Возможная потеря данных') : createCustomHTMLContent3(dataTable[i+1].pause),
                                      plus15Hours(new Date(dataTable[i].end_time)),		            
                                      minus15Hours(new Date(dataTable[i+1].STARTUP_TIME))
                            ] 

                                    );
                        }
                    }
                    self.setState({data: rows}); 
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

    requestDataTableFR006(){
      const self = this;
      const data_url = 'http://172.16.20.75:8060/?generaltimeline=fr06';
      const rows= [];
      axios.get(data_url)
              .then(function (response) {
                  // handle success
                  const dataTable=response.data;
                  const minValue=(Date.today().addMonths(-1));

                  for (let i = 0; i < dataTable.length-1; i += 1) {         
                      if (Date.compare(new Date(dataTable[i].STARTUP_TIME),minValue)===1){ 
                          rows.push(
                              [
                                       new Date(dataTable[i].STARTUP_TIME),
                                       dataTable[i].PROGRAM_NUMBER,
                                       new Date(dataTable[i].end_time),
                                       dataTable[i].duration.toString()
                                        
                          ]         
                        );
                      }
                  }
                 /* self.setState({dataTable: rows}); */
                  self.setState({dataTable: rows});
              
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
        this.requestDataTableFR006();
    }



    render(){
        return (
        /*   <div className="TimelineRaisa" id="timeline_div">
                { this.state && this.state.data &&<Chart
                chartType="Timeline"
               
                rows={this.state.data}       
                  columns={columns}       
                width="100%"
                height="400px"
                options={{
                colors: ['#98719D', '#A0BD85', '#5DBAD9'],
                }}

                />}
            </div>   */

<div className="TimelineRaisa" id="timeline_div">

фр06
<div className={"my-pretty-chart-container"}>
      { this.state && this.state.dataTable &&<Chart
      chartType="Table"
      chartLanguage = 'ru'

    /*  data={data}*/
     rows={this.state.dataTable}
      columns={[  { type: 'date', label: 'Start' },
                { type: "number",label:  "N обжига" },
                { type: 'date', label: 'Stop' },
                { type: "string", label: "Продолжительность" },
              ]}    
      
      width="100%"
      height="100%"
      options={{
         colors: ['#98719D', '#A0BD85', '#5DBAD9'],
         showRowNumber: true,
       }}      

       />}
  </div>



<div className={"my-pretty-chart-container"}>
      { this.state && this.state.data &&<Chart
      chartType="Timeline"
      chartLanguage = 'ru'
      rows={this.state.data}
              columns={columns}
      width="100%"
      height="100px"
      options={{
         colors: ['#98719D', '#A0BD85', '#5DBAD9'],
       }}      

       />}
  
  </div>

</div>
        );
    }
}

export default TimeLineFR06;