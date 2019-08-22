import React                    from 'react';
import Chart                    from 'react-google-charts';
import                               '../style.css';
import {connect}                from 'react-redux';
import {RequestGraphData}       from '../receivers/requestData';
import {graphOptionsRaisa}      from './GraphOptions'
import GraphButtons             from './GraphRaisaButtons'

export class GraphRaisa extends React.Component {
        
  requestData(dataToRequest){
    const AuthStr =JSON.parse(localStorage.getItem('currentUser'));

    RequestGraphData('Раиса', 'http://172.16.20.75:8060/?graph=raisa&program_number=' + dataToRequest + '&year=' + new Date().getFullYear(), AuthStr).then(resultArrayTablePresets=>{
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

  dataSelection = () => {
    if(this.props.graph_mode_selection.length()>0)
      if(this.props.graph_mode_selection.kiln=='Раиса')
        if(this.props.graph_mode_selection.graph_mode=='short')
          return this.state.dataShort;
        else if(this.props.graph_mode_selection.graph_mode=='all')
          return this.state.dataAll;
        else if(this.props.graph_mode_selection.graph_mode=='dataCurrents')
          return this.state.dataCurrents;
        else if(this.props.graph_mode_selection.graph_mode=='dataAirHeaters')
          return this.state.dataAirHeaters;
  }

  render() {
    return (
      <div className="GraphPage">    
        <div id="artical" style={{'text-align':'left'}}>     
          <span className='hr5'>Обжиг N {this.props.programNumber} </span>
        </div> 
        <div className="Graph" id="chart_div">
          {this.state && this.state.dataToDisplay &&<Chart
            width={1200}
            height={500}
            chartType="LineChart"
            chartLanguage = 'ru'
            loader={<div>Загружаем данные...</div>}
            data={this.state.dataShort}            
            legend_toggle={true}
            options= {graphOptionsRaisa}  
          />}
        </div>
        <GraphButtons kiln='Раиса'/>          
      </div>
    );
  }
}

const mapStateToProps = state => ({
  graph_mode_selection: state.graph_mode_selection,
}) 
 
export default connect(mapStateToProps)(GraphRaisa);