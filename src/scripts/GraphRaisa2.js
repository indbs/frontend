import React from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';



export class GraphRaisa2 extends React.Component {
        
    requestData(){
        const self = this;
        const takeValue = this.props.commonValueRaisa2;
        var x = Number(takeValue.valuePass);
      
        const data_url = "http://172.16.20.75:8060/?graph=raisa2&program_number="+x+"&year=2019";
        

        var chartDataCurrents=[],chartDataAirHeaters=[],chartDataShort=[];
        const chartDataAll =   [[{ type: 'date', label: 'Время'},'Азот SP, %', 'Азот PV, %','SP','Средняя °С', 'Ток L1, А', 'Ток L2, А', 'Ток L3, А', 
        'TC411, °С','TC412, °С', 'TC413, °С', 'A, %', 'B, %', 'C, %', 'D, %', 'E, %' ]];
        axios.get(data_url)
                .then(function (response) {
                    // handle success
              
                    const dataTable=response.data;
                    for (let i = 0; i < dataTable.length-1; i += 1) {
                        chartDataAll.push([
                            new Date(dataTable[i].time1), 
                            dataTable[i].oxygen_predict_sp,
                            dataTable[i].analiser_calc,
                            dataTable[i].setpoint, 
                            dataTable[i].average,                           
                            dataTable[i].current_l1,
                            dataTable[i].current_l2,
                            dataTable[i].current_l3,
                            dataTable[i].tc410,
                            dataTable[i].tc411,
                            dataTable[i].tc412,
                            dataTable[i].flap_a_percent_position,
                            dataTable[i].flap_b_percent_position,
                            dataTable[i].flap_c_percent_position,
                            dataTable[i].flap_d_percent_position,
                            dataTable[i].flap_e_percent_position                         
                        ]);
                        //new way
                        chartDataShort      = chartDataAll.map(function(row){return row.slice(0,5)});
                        chartDataCurrents   = chartDataAll.map(function(row){return row.slice(0,8)});
                        chartDataAirHeaters = chartDataAll.map(function(row){return [...row.slice(0,5),...row.slice(8,11)]});
                    }
                    console.log('chartDataCurrents ', chartDataCurrents);

                    self.setState({dataToDisplay: chartDataShort});
                    self.setState({dataCurrents: chartDataCurrents});  
                    self.setState({dataAirHeaters: chartDataAirHeaters});  
                    self.setState({dataAll: chartDataAll}); 
                    self.setState({dataShort: chartDataShort});                
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });     
    }

    handleClickAll = () => {
        this.setState( {dataToDisplay: this.state.dataAll} );
    }

    handleClickShort = () => {
        this.setState( {dataToDisplay: this.state.dataShort} );
    }

    handleClickCurrents = () => {
        this.setState( {dataToDisplay: this.state.dataCurrents} );
    }

    handleClickAirHeaters = () => {
        this.setState( {dataToDisplay: this.state.dataAirHeaters} );
    }

    componentWillReceiveProps() {
        this.requestData();      
    }

    render() {

        const takeValue = this.props.commonValueRaisa2;
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
                                            series:{0: {targetAxisIndex: 1},
                                                    1: {targetAxisIndex: 1},
                                                    2: {targetAxisIndex: 0},
                                                    3: {targetAxisIndex: 0},
                                                    4: {targetAxisIndex: 0},
                                                    5: {targetAxisIndex: 0},
                                                    6: {targetAxisIndex: 0},
                                                    7: {targetAxisIndex: 0},
                                                    8: {targetAxisIndex: 0},
                                                    9: {targetAxisIndex: 0},
                                                    10: {targetAxisIndex: 0},
                                                    11: {targetAxisIndex: 0},
                                                    12: {targetAxisIndex: 0},
                                                    13: {targetAxisIndex: 0},
                                                    14: {targetAxisIndex: 0},},
                                    hAxis: {title: 'Время каждые 5 минут',textStyle: {fontSize: 10},
                                    gridlines: {count: -1,units: {days: {format: ['MMM dd']},
                                    hours: {format: ['HH:mm', 'ha']},}},minorGridlines: {units: {hours: {format: ['HH:mm', 'ha']},
                                    minutes: {format: ['HH:mm', ':mm']}}},},
                                    vAxes: {0: {title: 'Температура, °С', 
                                    gridlines: {color: '#dadada'}, textStyle: {color: '#343434'}},
                                    1: {title: 'Азот, %', gridlines: {color: '#cc9a9a'}, 
                                    textStyle: {color: '#cc9a9a'}}},legend: { position: 'bottom', textStyle: {color: 'blue', fontSize: 12} },
                                    chartArea:{left:100,top:50,width:'85%',height:'85%'},vAxis: {format: '####'}
                                }
                            }  
                />
                        }
                </div>
                <div>
                  <p>  Граф Номер  {takeValue.valuePass}</p>
                </div>
            <div className="Buttons" id="chart_div_buttons">
                <button onClick={this.handleClickCurrents}>Показать токи</button>
                <button onClick={this.handleClickAirHeaters}>Показать возд. нагреватели</button>
                <button onClick={this.handleClickShort}>Показать только темперутру</button>
                <button onClick={this.handleClickAll}>Показать всё</button>
            </div>             
        </div>
      );
    }
  }
 
  export default GraphRaisa2;