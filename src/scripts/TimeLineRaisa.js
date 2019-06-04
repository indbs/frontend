import React from 'react';
//import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import axios from 'axios';

import GraphRaisa from './GraphRaisa';

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
export class TimeLineRaisa extends React.Component{


    constructor(props) {

            super(props);
            this.state = { value: "" };
        
            this.handleChange = this.handleChange.bind(this);
           /* this.handleSubmit = this.handleSubmit.bind(this);*/


            console.log(props);
          }
        

          handleChange(event) {
            this.setState({ value: event.target.value });
          }






    requestData(){
        const self = this;
        const data_url = 'http://172.16.20.75:8060/?generaltimeline=raisa';
        const rows=[];
        axios.get(data_url)
                .then(function (response) {
                    // handle success
                    const dataTable=response.data[1];
                    const minValue=(Date.today().addMonths(-1));
                    for (let i = 0; i < dataTable.length-1; i += 1) {
                        if (Date.compare(new Date(dataTable[i].STARTUP_TIME),minValue)===1){
                            rows.push([
                                        '1',
                                        dataTable[i].PROGRAM_NUMBER.toString(),
                                        '#b0d1f2',
                                         createCustomHTMLContent(
                                            dataTable[i].PROGRAM_NUMBER.toString(),
                                            dataTable[i].PROGRAM_NAME.toString(), 
                                            dataTable[i].duration.toString(), 
                                            dataTable[i].powerVAh.toString(),
                                            dataTable[i].powerkWh.toString(),
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
    

    requestDataTableRaisa(){
        const self = this;
        const data_url = 'http://172.16.20.75:8060/?generaltimeline=raisa';
        const rows= [];
        axios.get(data_url)
                .then(function (response) {
                    // handle success
                    const dataTable=response.data[1];
                    const minValue=(Date.today().addMonths(-1));
                    for (let i = 0; i < dataTable.length-1; i += 1) {
                        if (Date.compare(new Date(dataTable[i].STARTUP_TIME),minValue)===1){
                            rows.push(
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
                    
                   /* self.setState({dataTable: rows}); */
                    self.setState({dataTable: rows});
                    //self.setState({dataTable: columns});
                    self.setState({minDate: minValue});

                   /* var format_url1 = new google.visualization.PatternFormat('<a href=http://172.16.20.75:8080/GeneralTimeLine/TwoTablesServlet?program_number={1}">{0}</a>');
                    format_url1.format(dataTable, [2,1], 2);
                    var format_url2 = new google.visualization.PatternFormat('<a href=http://172.16.20.75:8080/GeneralTimeLine/GraficServlet?program_number={0}>{0}</a>');
                    format_url2.format(dataTable, [1]);  
*/

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
        this.requestDataTableRaisa();
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


Раиса
<div className={"my-pretty-chart-container"}>
      { this.state && this.state.dataTable &&<Chart
      chartType="Table"
      chartLanguage = 'ru'

    /*  data={data}*/
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
      height="400px"
      options={{
         colors: ['#98719D', '#A0BD85', '#5DBAD9'],
       }}      

       />}
  </div>


  <div>  

      
  <p>State: {64}</p>
  <GraphRaisa  value1={64}/>  

</div>

  
</div>
  );
    }
}

export default TimeLineRaisa;