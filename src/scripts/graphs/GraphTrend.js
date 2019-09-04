import React from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';

//redesign this module
export class GraphTrend extends React.Component {
        
    requestData(nextProps){
        
      const self = this;
      
      var x = nextProps;

      
        const data_url = "http://172.16.20.75:8060/?siemens=graph&year=2019&channel_number="+x;
        console.log('data_url ', data_url);



        const chartDataAll =   [[{ type: 'date', label: 'Время'} , 'Азот PV, %' ]];
        var chartDataShort=[[{ type: 'date', label: 'Время'} , 'Азот PV, %' ]];
        axios.get(data_url)
                .then(function (response) {
                    const dataTable=response.data;
                    console.log('dataTable.length-1 ', dataTable.length-1);
                    for (let i = 0; i < dataTable.length-1; i += 1) {
                        chartDataAll.push([
                            new Date(dataTable[i].time), 
                             dataTable[i].concentration,  
                             dataTable[i].channel_number,     
                        ]);
                        chartDataShort      = chartDataAll.map(function(row){return row.slice(0,2)});
          
                    }
                    self.setState({chartDataAll: chartDataAll });
                    self.setState({chartDataShort: chartDataShort });    
                  
                  
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
    }
      
   


    componentWillReceiveProps(nextProps) {
      console.log('next props', nextProps.valueTrend); 
      console.log('value pass', this.props.valueTrend);  

      if (this.props.valueTrend !== nextProps.valueTrend) {
           this.requestData(nextProps.valueTrend);
      }
      else    this.requestData(this.props.valueTrend);
  }  


    render() {

     const takeValue = this.props.valueTrend;
      var x = Number(takeValue);
     
     
    return (
      <div className="GraphPage">    
     
     <div className="GraphPage">    
                        <div className="Graph" id="chart_div">
                        {this.state && this.state.chartDataShort &&<Chart
                            width={1200}
                            height={800}
                            chartType="LineChart"
                            chartLanguage = 'ru'
                            loader={<div>Загружаем данные...</div>}
                            data={this.state.chartDataShort}
                            legend_toggle={true}
                            options={{
                              title: 'Показания газоанализатора '+x,
                              explorer: {actions: ['dragToZoom', 'rightClickToReset'],keepInBounds: true,maxZoomIn: 8.0},series: {0: {targetAxisIndex: 0},},pointSize: 5,hAxis: {title: 'Время, каждые 5 мин',textStyle: {fontSize: 10},gridlines: {count: -1,units: {days: {format: ['MMM dd']},hours: {format: ['HH:mm', 'ha']},}},minorGridlines: {units: {hours: {format: ['HH:mm', 'ha']},minutes: {format: ['HH:mm', ':mm']}}},},
                              vAxes: {0: {title: 'Азот, %', gridlines: {color: '#dadada'}, textStyle: {color: '#343434'}},},legend: { position: 'bottom', textStyle: {color: 'blue', fontSize: 12} },chartArea:{top:50,width:'85%',height:'65%'},vAxis: {format: '##.######',gridlines: { count: 8 }}
                              }}
                            rootProps={{ 'data-testid': '3' }}
                            chartPackages={['corechart', 'controls']}
                            controls={[
                              {
                                controlType: 'ChartRangeFilter',
                                options: {
                                  filterColumnIndex: 0,
                                  ui: {
                                    chartOptions: {
                                      height: 50,
                                        width: 1200,
                                        chartArea: {
                                            width: '80%'
                                        }
                                    },
                                  },
                                },
                                controlPosition: 'bottom',
                              },
                            ]} 
                />
                        }
                </div>          
                    </div> 
          <div className="Buttons" id="chart_div_buttons">
                        <div>
                        <p>  Тренд Номер Catch2 {this.props.valueTrend}</p>
                      </div>
          </div>             
   </div>
    );
  }








  }
 
  export default GraphTrend;