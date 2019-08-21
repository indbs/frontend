import React                                from 'react';
import Chart                                from 'react-google-charts';
import GraphRaisa                           from '../graphs/GraphRaisa';
import                                           './info.css';
import                                           '../style.css';
import logo_loading                         from '../../logos/fp_logo_loading.svg';
import {connect}                            from 'react-redux';
import {RequestTimelineData}                from '../receivers/requestData'
import {TimelineColumns, TableColumns}      from '../receivers/handleDataResponse';
import TwoTablesRaisa                       from '../twoTables/TwoTablesRaisa';
import {
  burn_graph_number_received,
  burn_two_tables_number_received}          from '../../actions/aux_data_receiving_action';

export class InfoRaisa extends React.Component{
  constructor(props) {
    super(props);
  }

  requestData(){
    const self = this;
    const AuthStr =JSON.parse(localStorage.getItem('currentUser'));

    RequestTimelineData('Раиса', 'http://172.16.20.75:8060/?generaltimeline=raisa', AuthStr).then(resultArrayTwoDataPresets=>{
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
      var selection =               chartWrapper.getChart().getSelection();
      var selectedTimelineValue =   chartWrapper.getDataTable().getValue(selection[0].row,1);  
      this.props.dispatch(burn_graph_number_received('Раиса', parseInt(selectedTimelineValue))); 
    }
  }];
      
  chartEventsTable =[{
    eventName: 'select',
    callback  : ({chartWrapper}) => { 
      var selection =               chartWrapper.getChart().getSelection();
      var selectedTableValue =      chartWrapper.getDataTable().getValue(selection[0].row,1); 
      this.props.dispatch(burn_two_tables_number_received('Раиса', parseInt(selectedTableValue))); 
    }
  }];

  render(){
    return (
      <div className={'my-global-div'} >

        <div id='table' className={'my-table-div'}>
          { this.state && this.state.dataTable &&
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
            />
          }
        </div> 

        <div id='timeline' className={'my-timeline-div-info-raisa'}>
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
              chartEvents={this.chartEventsTimeline}          
            />
          }
        </div>
        
        {(!this.state || !this.state.dataTimeLine || !this.state.dataTable)  &&
          <div className='logoWidth'>
            <div>
              <p >Загружаем...</p>
              <img src={logo_loading} className="App-logo-loading" alt="waiting" />
            </div>
          </div>
        }
        
        <div id='graph' className={'my-graphRaisa-div'}>
          { this.state && this.state.dataTimeLine && this.props.aux_data_received &&this.props.aux_data_received.number && !this.props.aux_data_received.two_tables_number &&
            <GraphRaisa programNumber={this.props.aux_data_received.number}/> 
          }
        </div>
    
        <div id='two_tables' className={'my-twoTablesRaisa-div'}>
          { this.state && this.state.dataTimeLine && this.props.aux_data_received &&this.props.aux_data_received.two_tables_number &&       
            <TwoTablesRaisa programNumber={this.props.aux_data_received.two_tables_number}/>
          }
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  aux_data_received: state.aux_data_received.filter(c => c.kiln=='Раиса')[0]
}) 

const mapDispatchToProps = dispatch => ({
  dispatch(params){
    dispatch(params);
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoRaisa);