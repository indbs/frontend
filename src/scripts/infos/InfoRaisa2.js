import React from 'react';
import Chart from 'react-google-charts';
import GraphRaisa2 from '../graphs/GraphRaisa2';
import { connect } from 'react-redux';
import {RequestTimelineData} from '../receivers/requestData'
import {TimelineColumns, TableColumns} from '../receivers/handleDataResponse';

export class InfoRaisa2 extends React.Component{
    
  constructor(props) {
    super(props);
    this.state = { valuePass: this.props.lastBorn };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ valuePass: value });
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

  chartEvents =[{
    eventName: 'select',
    callback  : ({chartWrapper}) => { 
      var selection = chartWrapper.getChart().getSelection();
      var value = chartWrapper.getDataTable().getValue(selection[0].row,1);     
      this.handleChange(value);
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
            chartEvents={this.chartEvents }
          />}
      </div>
      <div className={'my-graphRaisa-div'}>
        <GraphRaisa2 commonValueRaisa2={this.state}/>
      </div>
    </div>
      );
    }
  }
/*          
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

  const mapDispatchToProps = dispatch => {
    alert('Hello2');
    console.log('hello 2');
    return {
      onTodoClick: () => { // handles onTodoClick prop's call here
        dispatch(addTodo())
      } 
    } 
  }
*/
  //export default connect(mapStateToProps,{mapDispatchToProps})(InfoRaisa2);
  export default InfoRaisa2;