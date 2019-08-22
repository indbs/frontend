import React                                              from 'react';
import Chart                                              from 'react-google-charts';
import {connect}                                          from 'react-redux';
import {RequestGraphData}                                 from '../receivers/requestData';
import {graphOptionsRaisa}                                from './GraphOptions'
import GraphButtons, {buttonSelectionPreset}              from './GraphRaisaButtons'

export class GraphRaisa2 extends React.Component {
       
  requestData(dataToRequest){
    const AuthStr =JSON.parse(localStorage.getItem('currentUser'));

    RequestGraphData('Раиса2', 'http://172.16.20.75:8060/?graph=raisa2&program_number='+dataToRequest+'&year=' + new Date().getFullYear(), AuthStr).then(resultArrayTablePresets=>{
      this.setState({dataCurrents:    resultArrayTablePresets.chartDataCurrents});  
      this.setState({dataAirHeaters:  resultArrayTablePresets.chartDataAirHeaters});  
      this.setState({dataAll:         resultArrayTablePresets.chartDataAll}); 
      this.setState({dataShort:       resultArrayTablePresets.chartDataShort});
    }); 
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.programNumber !== nextProps.programNumber) {
      this.requestData(nextProps.programNumber);
    }
  }

  componentDidMount() {
    this.requestData(this.props.programNumber);
  }

  render() {
    var displayParameter =buttonSelectionPreset(this.props.graph_mode_selection, 'Раиса2');
    return (
      <div className="GraphPage">   
        <div id="artical" style={{'text-align':'left'}}>     
          <span className='hr5'>Обжиг N {this.props.programNumber} </span>
        </div>  
        <div className="Graph" id="chart_div">
          {this.state && this.state.dataShort &&
            <Chart
              width={1200}
              height={500}
              chartType="LineChart"
              chartLanguage = 'ru'
              loader={<div>Загружаем данные...</div>}
              data={(()=>{
                switch(displayParameter)
                {
                  case 'short':         return this.state.dataShort;
                  case 'currents':      return this.state.dataCurrents;
                  case 'airHeaters':    return this.state.dataAirHeaters;
                  case 'all':           return this.state.dataAll;
                }
              })()}
              legend_toggle={true}
              options= {graphOptionsRaisa}  
            />
          }
        </div>
        <GraphButtons kiln='Раиса2'/>      
      </div>
    );
  }
}
 
const mapStateToProps = state => ({
  graph_mode_selection: state.graph_mode_selection,
}) 
 
export default connect(mapStateToProps)(GraphRaisa2);