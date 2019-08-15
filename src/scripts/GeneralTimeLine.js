import React from 'react';
import Chart from "react-google-charts";
import 'moment/locale/ru';
import './GeneralTimeLine.css';
//import LoadingLogo from '../loading_logo'
import logo_loading from '../fp_logo_loading.svg';
import {RequestTimelineDataData} from './receivers/requestData'

require('datejs');  

const columns = [
    { type: "string", id: "Role" },
    { type: "string", id: "Name" },
    { type: "string", id: 'style', role: 'style' },
    { type: 'string', role: 'tooltip','p': {'html': true}},
    { type: 'date', id: 'Start' },
    { type: 'date', id: 'Stop' }
  ];
export class GeneralTimeLine extends React.Component{
         
  lastWorkRaisa = 0;

  constructor(props) {
    super(props);
    this.state = { value1: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  requestData(){
    const self = this;
    const AuthStr =JSON.parse(localStorage.getItem('currentUser'));
     
    RequestTimelineDataData('Раиса', 'http://172.16.20.75:8060/?generaltimeline=raisa', AuthStr).then(rowsTimeLine=>{
      self.setState({dateTimeLineRaisa: rowsTimeLine});
    });
    
    RequestTimelineDataData('Раиса2', 'http://172.16.20.75:8060/?generaltimeline=raisa2', AuthStr).then(rowsTimeLine=>{
      self.setState({dateTimeLineRaisa2: rowsTimeLine});
    });

    RequestTimelineDataData('ФР05', 'http://172.16.20.75:8060/?generaltimeline=fr05', AuthStr).then(rowsTimeLine=>{
      self.setState({dateTimeLineFR05: rowsTimeLine});
    });
  
    RequestTimelineDataData('ФР06', 'http://172.16.20.75:8060/?generaltimeline=fr06', AuthStr).then(rowsTimeLine=>{
      self.setState({dateTimeLineFR06: rowsTimeLine});
    });
  }

  componentDidMount() {
    this.requestData();      
    /*  this.requestDataRaisa2();      */
  }

  render(){
    return (
      <div className={"my-global-div"} >
        <div className={"my-timeline-div"}>
          { this.state && this.state.dateTimeLineRaisa && this.state.dateTimeLineRaisa2 && this.state.dateTimeLineFR05 && this.state.dateTimeLineFR06 &&
            <Chart
              chartType="Timeline"
              chartLanguage = 'ru'
              rows={[...this.state.dateTimeLineRaisa, ...this.state.dateTimeLineRaisa2, ...this.state.dateTimeLineFR05, ...this.state.dateTimeLineFR06]}
              columns={columns}
              width="1200px"
              height="300px"
              options={{
                colors: ['#98719D', '#A0BD85', '#5DBAD9'],
                width:"100%"
              }}    
            />
          }
        </div>
        {this.state &&(
          !this.state.dateTimeLineRaisa || !this.state.dateTimeLineRaisa2 || !this.state.dateTimeLineFR05 || !this.state.dateTimeLineFR06) &&
            <div>
              <p >Загружаем...</p>
              <img src={logo_loading} className="App-logo-loading" alt="waiting" />
              {/*<LoadingLogo fillcolor='#444444' width_pt='82pt' height_pt='82pt'/>*/}
            </div>
        }
        <div className={"my-text-div"}>
          <p > <a href = "mailto:b.smirnov@rusgates.ru; e.avdeeva@rusgates.ru"> Служба тех. поддержки </a> </p>  
          <p > © АО "Ферроприбор" </p>   
        </div> 
      </div>
    );
  }

}
  
export default GeneralTimeLine;