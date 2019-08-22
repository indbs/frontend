import React                    from 'react';
import Chart                    from 'react-google-charts';
import {RequestGraphData}       from '../receivers/requestData';
import {graphOptionsRaisa}      from './GraphOptions'

export class GraphRaisa2 extends React.Component {
       
  requestData(dataToRequest){
    const AuthStr =JSON.parse(localStorage.getItem('currentUser'));

    RequestGraphData('Раиса2', 'http://172.16.20.75:8060/?graph=raisa2&program_number='+dataToRequest+'&year=' + new Date().getFullYear(), AuthStr).then(resultArrayTablePresets=>{
      this.setState({dataToDisplay:   resultArrayTablePresets.chartDataShort});
      this.setState({dataCurrents:    resultArrayTablePresets.chartDataCurrents});  
      this.setState({dataAirHeaters:  resultArrayTablePresets.chartDataAirHeaters});  
      this.setState({dataAll:         resultArrayTablePresets.chartDataAll}); 
      this.setState({dataShort:       resultArrayTablePresets.chartDataShort});
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
    if (this.props.programNumber !== nextProps.programNumber) {
      this.requestData(nextProps.programNumber);
    }
  }

  componentDidMount() {
    this.requestData(this.props.programNumber);
  }

  render() {
    return (
      <div className="GraphPage">   
        <div id="artical" style={{'text-align':'left'}}>     
          <span className='hr5'>Обжиг N {this.props.programNumber} </span>
        </div>  
        <div className="Graph" id="chart_div">
          {this.state && this.state.dataToDisplay &&
            <Chart
              width={1200}
              height={500}
              chartType="LineChart"
              chartLanguage = 'ru'
              loader={<div>Загружаем данные...</div>}
              data={this.state.dataToDisplay}
              legend_toggle={true}
              options= {graphOptionsRaisa}  
            />
          }
        </div>
        <div className="Buttons" id="chart_div_buttons">
          <button className="butt" onClick={this.handleClickCurrents}>Показать токи</button>
          <button className="butt" onClick={this.handleClickAirHeaters}>Показать возд. нагреватели</button>
          <button className="butt" onClick={this.handleClickShort}>Показать только температуру</button>
          <button className="butt" onClick={this.handleClickAll}>Показать всё</button>
        </div>             
      </div>
    );
  }
}
 
export default GraphRaisa2;