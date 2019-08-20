import React                                from 'react';
import Chart                                from 'react-google-charts';
import GraphRaisa                           from '../graphs/GraphRaisa';
import                                           '../style.css';
import {connect}                            from 'react-redux';
import {RequestTimelineData}                from '../receivers/requestData'
import {TimelineColumns, TableColumns}      from '../receivers/handleDataResponse';
import TwoTablesRaisa                       from '../twoTables/TwoTablesRaisa';
import {last_burn_graph_number_received}    from '../../actions/aux_data_receiving_action';

export class InfoRaisa extends React.Component{
  constructor(props) {
    super(props);
    this.state = { 
      valueTwoTable: 10,
      flag: true
    };
    this.handleChangeTable = this.handleChangeTable.bind(this); 
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
      var selection = chartWrapper.getChart().getSelection();
      var selectedValue = chartWrapper.getDataTable().getValue(selection[0].row,1);    
      this.props.dispatch(last_burn_graph_number_received('Раиса', selectedValue)); 
    }
  }];
      
  chartEventsTable =[{
    eventName: 'select',
    callback  : ({chartWrapper}) => { 
      var selection = chartWrapper.getChart().getSelection();
      var valueTable = chartWrapper.getDataTable().getValue(selection[0].row,1);   
      this.handleChangeTable(valueTable);
    }
  }];

  handleChangeTable(valueTable) {
    this.setState({
      valueTwoTable: valueTable,
      flag:false
    });
  }

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
            
        <div id='graph' className={'my-graphRaisa-div'}>
          { this.props.aux_data_received &&this.props.aux_data_received.number && 
            <GraphRaisa commonValue={this.props.aux_data_received.number}/> 
          }
        </div>
    
        <div id='two_tables' className={'my-twoTablesRaisa-div'}>
          { this.state &&!this.state.flag &&       
            <TwoTablesRaisa commonValue={this.state.valueTwoTable}/>
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