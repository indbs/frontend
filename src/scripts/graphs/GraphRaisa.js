import   React                                              from 'react';
import   Chart                                              from 'react-google-charts';
import                                                           '../style.css';
import { connect }                                          from 'react-redux';
import { RequestGraphData }                                 from '../receivers/requestData';
import { graphOptionsRaisa }                                from './GraphOptions'
import   GraphButtons, { buttonSelectionPreset }            from './GraphRaisaButtons'
import { kiln_constants_ru,
         kiln_constants_en }                                from '../../constants/kiln_constants'
import { button_constants }                                 from '../../constants/button_constants'

// Graph
export class GraphRaisa extends React.Component {
        
  requestData(dataToRequest){
    const AuthStr =JSON.parse(localStorage.getItem('currentUser'));

    RequestGraphData(kiln_constants_ru.Раиса, 'http://172.16.20.75:8060/?graph=' + kiln_constants_en.Раиса + '&program_number=' + dataToRequest + '&year=' + new Date().getFullYear(), AuthStr).then(resultArrayTablePresets=>{
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
    var displayParameter =buttonSelectionPreset(this.props.graph_mode_selection, kiln_constants_ru.Раиса);
    return (
      <div className="GraphPage">    
        <div id="artical" style={{'text-align':'left'}}>     
          <span className='hr5'>Обжиг N {this.props.programNumber} </span>
        </div> 
        <div className="Graph" id="chart_div">
          {this.state && this.state.dataShort &&<Chart
            width={1200}
            height={500}
            chartType="LineChart"
            chartLanguage = 'ru'
            loader={<div>Загружаем данные...</div>}
            data={(()=>{
              switch(displayParameter)
              {
                case button_constants.short:         return this.state.dataShort;
                case button_constants.currents:      return this.state.dataCurrents;
                case button_constants.airHeaters:    return this.state.dataAirHeaters;
                case button_constants.all:           return this.state.dataAll;
              }
            })()}         
            legend_toggle={true}
            options= {graphOptionsRaisa}  
          />}
        </div>
        <GraphButtons kiln={kiln_constants_ru.Раиса}/>          
      </div>
    );
  }
}

const mapStateToProps = state => ({
  graph_mode_selection: state.graph_mode_selection,
}) 
 
export default connect(mapStateToProps)(GraphRaisa);