import React from 'react';
//import ReactDOM from 'react-dom';
import Chart from 'react-google-charts';
import GraphRaisa from '../graphs/GraphRaisa';
//import {NavLink} from 'react-router-dom';
//import './InfoRaisa.css';
import '../style.css';
import { connect } from 'react-redux';
import {RequestTimelineData} from '../receivers/requestData'
import {TimelineColumns, TableColumns} from '../receivers/handleDataResponse';
import TwoTablesRaisa from '../twoTables/TwoTablesRaisa';

export class InfoRaisa extends React.Component{
  constructor(props) {
    super(props);
    this.state = { 
      valuePass: 10,
      valueTwoTable: 10,
      flag: true
    };
    this.handleChange = this.handleChange.bind(this); 
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
  
  chartEvents =[{
    eventName: 'select',
    callback  : ({chartWrapper}) => {        
      var selection = chartWrapper.getChart().getSelection();
      var value = chartWrapper.getDataTable().getValue(selection[0].row,1);    
      this.handleChange(value);
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

  handleChange(value) {
    this.setState({ 
      valuePass: value,
      flag:true
    });             
  }

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
              chartEvents={this.chartEventsTable }
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
              chartEvents={this.chartEvents }          
            />
          }
        </div>
            
        <div id='graph' className={'my-graphRaisa-div'}>
          { this.state &&this.state.flag && 
            <GraphRaisa commonValue={this.state.valuePass}/> 
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
  
const mapStateToProps = function(state) {
  return {
    windowTables: state.reduxValues[0].windowTables,
    windowGraphic: state.reduxValues[0].windowGraphic,
    id: state.reduxValues[0].id,
    selcted_oven:state.reduxValues[0].selcted_oven,
    selectedBorn: state.reduxValues[0].selectedBorn,
    lastBorn: state.reduxValues[0].lastBorn
  }
}

export default connect(mapStateToProps)(InfoRaisa);