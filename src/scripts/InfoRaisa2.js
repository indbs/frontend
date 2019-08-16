import React from 'react';
//import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import 'moment/locale/ru';
import GraphRaisa2 from './GraphRaisa2';
import { connect } from 'react-redux';
import {RequestTimelineData} from './receivers/requestData'

import {addTodo} from '../actions/actions';

const columns = [
    { type: "string", id: "Role" },
    { type: "string", id: "Name" },
    { type: "string", id: 'style', role: 'style' },
    { type: 'string', role: 'tooltip','p': {'html': true}},
    { type: 'date', id: 'Start' },
    { type: 'date', id: 'Stop' }
  ];

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
    eventName: "select",
    callback  : ({chartWrapper}) => { 
      var selection = chartWrapper.getChart().getSelection();
      var value = chartWrapper.getDataTable().getValue(selection[0].row,1);     
      this.handleChange(value);
      }
  }];
     
  render(){
    return (
    <div className={"my-global-div"}>  

      <div className={"my-table-div"}>
      {this.state && this.state.dataTable &&
        <Chart
          chartType="Table"
          chartLanguage = 'ru'
          rows={this.state.dataTable}
          columns={[       
            { type: 'string', label: 'Start' },
            { type: "number",label:  "N обжига" },
            { type: 'string', label: 'Stop' },
            { type: "string", label: "Продолжительность" },
            { type: "string", label: "Азот" },
            { type: "string", label: "Вода" },
            { type: "string", label: "Полная мощность" },
            { type: "string", label: "Активная мощность" },
          ]}    
          width="1200px"
          height="100%"
          options={{
            showRowNumber: true,
            allowHtml: true, 
            width:"100%"
          }}  
          formatters={[
            {
              type: 'PatternFormat',
              column: [1],
              options: '<a href=GraphRaisa value1={0}>{0} </a>',  
            },  
        ]}
        />}
      </div>

      <div className={"my-timeline-div-info-raisa"}>
        { this.state && this.state.dataTimeLine &&
          <Chart
            chartType="Timeline"
            chartLanguage = 'ru'
            rows={this.state.dataTimeLine}
            columns={columns}
            width="1200px"
            height="100px"
            options={{
              width:"100%"
            }}    
            chartEvents={this.chartEvents }
          />}
      </div>
      <div className={"my-graphRaisa-div"}>
        <GraphRaisa2 commonValueRaisa2={this.state}/>
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

/*
  const mapDispatchToProps = {
    addToDo
  }
*/

  const mapDispatchToProps = dispatch => {
    alert("Hello2");
    console.log("hello 2");
    return {
      onTodoClick: () => { // handles onTodoClick prop's call here
        dispatch(addTodo())
      }
      
    }

    
  }

  export default connect(mapStateToProps,{mapDispatchToProps})(InfoRaisa2);