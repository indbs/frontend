import React from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';
import './style.css';
/*  /*  const data_url_test = 'http://172.16.20.75:8060/?graph=raisa&program_number=63&year=2019'; /**/

export class GraphRaisa extends React.Component {
        
  requestData(dataToRequest){
    console.log('requesting data');
    const self = this;
    //const takeValue = this.props.commonValue;
  
    const data_url = "http://172.16.20.75:8060/?graph=raisa&program_number="+dataToRequest+"&year=2019";

    var chartDataCurrents=[],chartDataAirHeaters=[],chartDataShort=[];
    const chartDataAll =   [[{ type: 'date', label: 'Время'},'Азот SP, %', 'Азот PV, %','SP','Средняя °С', 'Ток L1, А', 'Ток L2, А', 'Ток L3, А', 
    'TC411, °С','TC412, °С', 'TC413, °С', 'A, %', 'B, %', 'C, %', 'D, %', 'E, %' ]];
    const AuthStr =JSON.parse(localStorage.getItem('currentUser'));
    axios.get(data_url, {headers: {'Authorization': AuthStr.token}})
      .then(function (response) {
      // handle success
        const dataTable=response.data;

        for (let i = 0; i < dataTable.length-1; i += 1) {
          chartDataAll.push([
            new Date(dataTable[i].time), 
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
          chartDataCurrents   = chartDataAll.map(function(row){return row.slice(0,9)});
          chartDataAirHeaters = chartDataAll.map(function(row){return [...row.slice(0,5),...row.slice(8,11)]});
        }

        self.setState({dataToDisplay: chartDataShort});
        self.setState({dataCurrents: chartDataCurrents});  
        self.setState({dataAirHeaters: chartDataAirHeaters});  
        self.setState({dataAll: chartDataAll}); 
        self.setState({dataShort: chartDataShort});                
      }
    )
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

  componentWillReceiveProps(nextProps) {
    if (this.props.commonValue !== nextProps.commonValue) {
      console.log('this.props.commonValue !== nextProps.commonValue');
      this.requestData(nextProps.commonValue);
      this.setState( {currentProgramNumber: nextProps.commonValue} );
    }
    else {
      //this.requestData(this.props.commonValue);
      console.log('else {this.requestData(this.props.commonValue);');
      //this.setState( {currentProgramNumber: this.props.commonValue} );
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
                hAxis: {
                    title: 'Время каждые 5 минут',
                    textStyle: {fontSize: 10}, 
                    gridlines: {count: -1, units: 
                        {days: {format: ['MMM dd']},
                        hours: {format: ['HH:mm', 'ha']},}},
                    minorGridlines: {units: 
                        {hours: {format: ['HH:mm', 'ha']},
                        minutes: {format: ['HH:mm', ':mm']}}},},
                vAxes: {
                    0: {title: 'Температура, °С', 
                        gridlines: {color: '#dadada'}, 
                        textStyle: {color: '#343434'}},
                    1: {title: 'Азот, %', 
                        gridlines: {color: '#cc9a9a'}, 
                        textStyle: {color: '#cc9a9a'}}},
                legend: { 
                    position: 'bottom', 
                    textStyle: {color: 'blue', fontSize: 12} },
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