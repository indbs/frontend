import React from 'react';
import Chart from 'react-google-charts';
import './style.css';
import {RequestGraphData} from './receivers/requestData';

export class GraphRaisa extends React.Component {
        
  requestData(dataToRequest){
    const self = this;
    const AuthStr =JSON.parse(localStorage.getItem('currentUser'));

    RequestGraphData('Раиса', 'http://172.16.20.75:8060/?graph=raisa&program_number=' + dataToRequest + '&year=2019', AuthStr).then(resultArrayTablePresets=>{
      self.setState({dataToDisplay:   resultArrayTablePresets.chartDataShort});
      self.setState({dataCurrents:    resultArrayTablePresets.chartDataCurrents});  
      self.setState({dataAirHeaters:  resultArrayTablePresets.chartDataAirHeaters});  
      self.setState({dataAll:         resultArrayTablePresets.chartDataAll}); 
      self.setState({dataShort:       resultArrayTablePresets.chartDataShort}); 
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

  componentWillReceiveProps(nextProps) {
    if (this.props.commonValue !== nextProps.commonValue) {
      this.requestData(nextProps.commonValue);
      this.setState( {currentProgramNumber: nextProps.commonValue} );
    }
  }

  componentDidMount() {
    this.requestData(this.props.commonValue);  
  }

  render() {
    return (
      <div className="GraphPage">    
        <div className="Graph" id="chart_div">
          {this.state && this.state.dataToDisplay &&<Chart
            width={1200}
            height={500}
            chartType="LineChart"
            chartLanguage = 'ru'
            loader={<div>Загружаем данные...</div>}
            data={this.state.dataToDisplay}
            legend_toggle={true}
            options= {{
              title: 'Обжиг № ' + this.props.commonValue,
              explorer: {
                actions: ['dragToZoom', 'rightClickToReset'],
                keepInBounds: true,maxZoomIn: 8.0
              },
              series:{
                0: {targetAxisIndex: 1},
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
                14: {targetAxisIndex: 0},
              },
              hAxis: {
                title: 'Время каждые 5 минут',
                textStyle: {fontSize: 10}, 
                gridlines: {
                  count: -1, 
                  units: 
                  {
                    days: {
                      format: ['MMM dd']
                    },
                    hours: {
                      format: ['HH:mm', 'ha']
                    },
                  }
                },
                minorGridlines: {
                  units: 
                  {
                    hours: {
                      format: ['HH:mm', 'ha']
                    },
                    minutes: {
                      format: ['HH:mm', ':mm']
                    }
                  }
                },
              },
              vAxes: {
                0: {
                  title: 'Температура, °С', 
                  gridlines: {color: '#dadada'}, 
                  textStyle: {color: '#343434'}
                },
                1: {
                  title: 'Азот, %', 
                  gridlines: {color: '#cc9a9a'}, 
                  textStyle: {color: '#cc9a9a'}
                }
              },
              legend: { 
                  position: 'bottom', 
                  textStyle: {color: 'blue', fontSize: 12}
                },
              chartArea:{
                  left:100,
                  top:50,
                  width:'85%',
                  height:'85%'},
              vAxis: {format: '####'}
            }}  
          />}
      </div>
        {this.state && this.state.dataToDisplay &&
          <div className="Buttons" id="chart_div_buttons" style={{'margin-left': '10%'}}>
            <button className="butt"  onClick={this.handleClickCurrents}>Показать токи</button>
            <button className="butt"  onClick={this.handleClickAirHeaters}>Показать возд. нагреватели</button>
            <button className="butt"  onClick={this.handleClickShort}>Показать только температуру</button>
            <button className="butt"  onClick={this.handleClickAll}>Показать всё</button>
          </div>
        }             
      </div>
    );}
  }
 
  export default GraphRaisa;