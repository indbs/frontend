import React from 'react';
import axios2 from 'axios';
import Chart from 'react-google-charts';

class GraphRaisa extends React.Component{
    requestData2(){
        const self = this;
        const data_url = `http://94.140.216.17:8889/php/request_program.php?number=`+this.props.value1;
        const chartData =   [[ { type: 'date', label: 'Time' }, {type: 'number', label: 'SP'},{type: 'number', label: 'Average'}]
                            /*  [new Date('2018-06-14 21:04:27'),56,87],
                                [new Date('2018-06-16 21:04:27'),56,87]*/
                            ];
        axios2.get(data_url)
                .then(function (response) {
                    // handle success
                    const dataTable=response.data.Points;
                    for (let i = 0; i < dataTable.length-3; i += 1) {
                        chartData.push([new Date(dataTable[i].Time), parseInt(dataTable[i].Sp), parseInt(dataTable[i].Average)]);
                    }
                    self.setState({dataGraph: chartData}); 

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
        this.requestData2();
    }
    render(){
        return (
            <div className="Graph" id="chart_div">
                { this.state && this.state.dataGraph &&<Chart
                    width={1200}
                    height={600}
                    chartType="LineChart"
                    chartLanguage = 'ru'
                    loader={<div>Загружаем данные...</div>}
                    data={this.state.dataGraph}
                    options={{  
                        chart: {
                            title: 'Программа обжига №66',
                            subtitle: 'за 2018 год'
                        },
                        legend: { position: 'bottom', textStyle: {color: 'blue', fontSize: 12} },
                        hAxis: {title: 'Время каждые 5 минут',
                        textStyle: {fontSize: 10},
                        gridlines: {count: -1,
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
                        explorer: {
                            actions: ['dragToZoom', 'rightClickToReset'],
                            keepInBounds: true,
                            maxZoomIn: 8.0
                        },
                    }}
                />
                }
            </div>
        );
    }
  }
  
  export default GraphRaisa;