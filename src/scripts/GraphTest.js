import React from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';


const chartData =   [
    { type: 'date', label: 'Время' }, 
    {type: 'number', label: 'Азот SP, %'},
    {type: 'number', label: 'Азот PV, %'},

    {type: 'number', label: 'Ток L1, А'},
    {type: 'number', label: 'Ток L2, А'},
    {type: 'number', label: 'Ток L3, А'},
    {type: 'number', label: 'SP'},
    {type: 'number', label: 'Средняя °С'},
    {type: 'number', label: 'TC411, °С'},
    {type: 'number', label: 'TC412, °С'},
    {type: 'number', label: 'TC413, °С'},
    {type: 'number', label: 'A, %'},
    {type: 'number', label: 'B, %'},
    {type: 'number', label: 'C, %'},
    {type: 'number', label: 'D, %'},
    {type: 'number', label: 'E, %'}
];

/*  /*  const data_url_test = 'http://172.16.20.75:8060/?graph=raisa&program_number=63&year=2019'; /**/

export class GraphTest extends React.Component {
    requestData(){
        const self = this;
        const takeValue = this.props.commonValue;
   

      

        const data_url = "http://172.16.20.75:8060/?graph=raisa&program_number=16&year=2019";
     

        const chartData =   [[{ type: 'date', label: 'Время'},'Азот SP, %', 'Азот PV, %', 'Ток L1, А', 'Ток L2, А', 'Ток L3, А', 'SP',
        'Средняя °С','TC411, °С','TC412, °С', 'TC413, °С', 'A, %', 'B, %', 'C, %', 'D, %', 'E, %' ]];
        axios.get(data_url)
                .then(function (response) {
                    // handle success
              
                    const dataTable=response.data;
                    for (let i = 0; i < dataTable.length-1; i += 1) {
                        chartData.push([
                            new Date(dataTable[i].time), 
                            parseInt(dataTable[i].oxygen_predict_sp),
                            parseInt( dataTable[i].analiser_calc),
                            parseInt(dataTable[i].current_l1),
                            parseInt(dataTable[i].current_l2),
                            parseInt(dataTable[i].current_l3),
                            parseInt(dataTable[i].setpoint), 
                            parseInt(dataTable[i].average),
                            parseInt(dataTable[i].tc410),
                            parseInt( dataTable[i].tc411),
                            parseInt(dataTable[i].tc412),
                            parseInt(dataTable[i].flap_a_percent_position),
                            parseInt( dataTable[i].flap_b_percent_position),
                            parseInt(dataTable[i].flap_c_percent_position),
                            parseInt(dataTable[i].flap_d_percent_position),
                            parseInt( dataTable[i].flap_e_percent_position)
                            
                        ]);

                        console.warn("info ",chartData);
                    }
                    self.setState({data: chartData}); 
                    console.warn("info ",chartData);
                    
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });     
    }


    handleClick = () => {
        alert('this is:', this);
      }

    componentDidMount() {
        this.requestData();      
    }


    render() {
        const takeValue = this.props.commonValue;
      return (
        <div className="GraphPage" id="chart_div">    
                        <div className="Graph" id="chart_div">
                        {this.state && this.state.data &&<Chart
                            width={1200}
                            height={600}
                            chartType="LineChart"
                            chartLanguage = 'ru'
                            loader={<div>Загружаем данные...</div>}
                            data={this.state.data}
                            options= {{
                                title: 'Обжиг № ',
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
                            controls={[
                                {
                                  controlEvents: [
                                    {
                                      eventName: 'ready',
                                      callback: ({ chartWrapper, controlWrapper }) => {
                                        alert(
                                          'State changed to ' + JSON.stringify(controlWrapper.getState()),
                                         
                                        )
                                        /*var view =new google.visualization.DataView (chartWrapper); */ 
                                      },
                                    },
                                  ],
                                  controlType: 'CategoryFilter',
                                  options: {
                                    filterColumnIndex: 1,
                                    ui: {
                                      labelStacking: 'vertical',
                                      label: 'Gender Selection:',
                                      allowTyping: false,
                                      allowMultiple: false,
                                    },
                                  },
                                },
                              ]}    
                    
                />
                        }
                </div>
         <div className="Buttons" id="chart_div">

                 <button onClick={this.handleClick}>Click me</button>
                <button type="button" className="btn btn-secondary" onClick="clearForm();" data-dismiss="modal">Отмена</button>

         </div>
             
        </div>
      );
    }
  }
 
  export default GraphTest;