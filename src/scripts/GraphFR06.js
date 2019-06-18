import React from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';



export class GraphFR06 extends React.Component {
        
    requestData(){
        const self = this;
        const takeValue = this.props.commonValueFR06;
        var x = Number(takeValue.valuePass);
      console.log ('takeValue.valuePass',takeValue.valuePass);


        const data_url = "http://172.16.20.75:8060/?graph=fr06&program_number="+x+"&year=2019";
        

        var chartDataCurrents=[],chartDataAirHeaters=[],chartDataShort=[];
        const chartDataAll =   [[{ type: 'date', label: 'Время'},'Уставка, °С', 'Температура S, °С', 'Температура K, °С']];
        axios.get(data_url)
                .then(function (response) {
                    // handle success
              
                    const dataTable=response.data;
                    for (let i = 0; i < dataTable.length-1; i += 1) {
                        chartDataAll.push([
                            new Date(dataTable[i].time), 
                            dataTable[i].MV_HEAT,
                            dataTable[i].TEMP_S,
                            dataTable[i].TEMP_K 
                                                   
                        ]);

                    }
                
                    self.setState({dataToDisplay: chartDataAll});
                             
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });     
    }

  
   
    componentWillReceiveProps() {
        this.requestData();      
    } 

    render() {

        const takeValue = this.props.commonValueFR06;
        var x = Number(takeValue.valuePass);

      return (
        <div className="GraphPage">    
                        <div className="Graph" id="chart_div">
                        {this.state && this.state.dataToDisplay &&<Chart
                            width={1200}
                            height={800}
                            chartType="LineChart"
                            chartLanguage = 'ru'
                            loader={<div>Загружаем данные...</div>}
                            data={this.state.dataToDisplay}
                            legend_toggle={true}
                            options= {{
                                title: 'Обжиг № '+x,
                                explorer: {actions: ['dragToZoom', 'rightClickToReset'],
                                            keepInBounds: true,maxZoomIn: 8.0},
                                            series:{0: {targetAxisIndex: 0},
                                                    1: {targetAxisIndex: 0},
                                                    2: {targetAxisIndex: 0},
                                                    },
                                                    hAxis: {
                                                        title: 'Время, каждые 5 мин',
                                                        textStyle: {fontSize: 10},
                                                        gridlines: {
                                                            count: -1,
                                                            units: {
                                                                days: {format: ['MMM dd']},
                                                                hours: {format: ['HH:mm', 'ha']},
                                                            }
                                                        },
                                                        minorGridlines: {
                                                            units: {
                                                                hours: {format: ['HH:mm', 'ha']},
                                                                minutes: {format: ['HH:mm', ':mm']}
                                                            }
                                                        },
                                                    },
                                                    vAxes: {
                                                        0: {
                                                            title: 'Температура, °С',
                                                            gridlines: {color: '#dadada'},
                                                            textStyle: {color: '#343434'}
                                                        },
                                                    },
                                                    legend: { 			position: 'bottom',
                                                        textStyle: {color: 'blue', fontSize: 12} 
                                                    },
                                                    chartArea:{left:100,top:50,width:'85%',height:'85%'},
                                                    vAxis: {format: '####'}
                                }
                            }  
                />
                        }
                </div>
                <div>
                  <p>  Граф Номер  {takeValue.valuePass}</p>
                </div>
                     
        </div>
      );
    }
  }
 
  export default GraphFR06;