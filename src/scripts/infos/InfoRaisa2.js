import React                                from 'react';
import Chart                                from 'react-google-charts';
import GraphRaisa2                          from '../graphs/GraphRaisa2';
import { connect }                          from 'react-redux';
import                                           './info.css';
import {RequestTimelineData}                from '../receivers/requestData'
import logo_loading                         from '../../logos/fp_logo_loading.svg';
import {TimelineColumns, TableColumns}      from '../receivers/handleDataResponse';
import TwoTablesRaisa2                      from '../twoTables/TwoTablesRaisa2';
import {
  burn_graph_number_received,
  burn_two_tables_number_received}          from '../../actions/aux_data_receiving_action';

export class InfoRaisa2 extends React.Component{
  constructor(props) {
    super(props);
  }

  requestData(){
    const self = this;
    const AuthStr =JSON.parse(localStorage.getItem('currentUser'));

    RequestTimelineData('Раиса2', 'http://172.16.20.75:8060/?generaltimeline=raisa2', AuthStr).then(resultArrayTwoDataPresets=>{
      self.setState({dataTimeLine:  resultArrayTwoDataPresets.rowsTimeLine});
      self.setState({dataTable:     resultArrayTwoDataPresets.rowsTable});
    });    
  }

  componentDidMount() {
      this.requestData();  
  }

  chartEventsTimeline =[{
    eventName: 'select',
    callback  : ({chartWrapper}) => { 
      var selection =             chartWrapper.getChart().getSelection();
      var selectedTimelineValue = chartWrapper.getDataTable().getValue(selection[0].row,1);     
      this.props.dispatch(burn_graph_number_received('Раиса2', parseInt(selectedTimelineValue)));
      }
  }];

  chartEventsTable =[{
    eventName: 'select',
    callback  : ({chartWrapper}) => { 
      var selection =               chartWrapper.getChart().getSelection();
      var selectedTableValue =      chartWrapper.getDataTable().getValue(selection[0].row,1); 
      this.props.dispatch(burn_two_tables_number_received('Раиса2', parseInt(selectedTableValue))); 
    }
  }];
     
  render(){
    return (
    <div className={'my-global-div'}>  

      <div className={'my-table-div'}>
      {this.state && this.state.dataTable &&
        <Chart
          chartType='Table'
          chartLanguage = 'ru'
          rows={this.state.dataTable}
          columns={TableColumns}    
          width='1200px'
          height='100%'
          options={{
            showRowNumber: true,
            allowHtml: true, 
            width:'100%'
          }} 
          chartEvents={this.chartEventsTable} 
        />}
      </div>

      <div className={'my-timeline-div-info-raisa'}>
        { this.state && this.state.dataTimeLine &&
          <Chart
            chartType='Timeline'
            chartLanguage = 'ru'
            rows={this.state.dataTimeLine}
            columns={TimelineColumns}
            width='1200px'
            height='100px'
            options={{
              width:'100%'
            }}    
            chartEvents={this.chartEventsTimeline }
          />}
      </div>

      {(!this.state || !this.state.dataTimeLine || !this.state.dataTable)  &&
        <div className='logoWidth'>
          <div>
            <p >Загружаем...</p>
            <img src={logo_loading} className="App-logo-loading" alt="waiting" />
          </div>
        </div>
      }

      <div className={'my-graphRaisa-div'}>
        { this.state && this.state.dataTimeLine && this.props.aux_data_received &&this.props.aux_data_received.number && !this.props.aux_data_received.two_tables_number &&
          <GraphRaisa2 programNumber={this.props.aux_data_received.number}/>
        }
      </div>
      <div id='two_tables' className={'my-twoTablesRaisa-div'}>
          { this.state && this.state.dataTimeLine && this.props.aux_data_received &&this.props.aux_data_received.two_tables_number &&       
            <TwoTablesRaisa2 programNumber={this.props.aux_data_received.two_tables_number}/>
          }
        </div>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  aux_data_received: state.aux_data_received.filter(c => c.kiln=='Раиса2')[0]
}) 

const mapDispatchToProps = dispatch => ({
  dispatch(params){
    dispatch(params);
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoRaisa2);