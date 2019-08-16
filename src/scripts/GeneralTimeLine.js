import React                  from 'react';
import Chart                  from "react-google-charts";
import                             './GeneralTimeLine.css';
import logo_loading           from '../fp_logo_loading.svg';
import {RequestTimelineData}  from './receivers/requestData';
import {TimelineColumns}     from './receivers/handleDataResponse';

export class GeneralTimeLine extends React.Component{

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
     
    RequestTimelineData('Раиса', 'http://172.16.20.75:8060/?generaltimeline=raisa', AuthStr).then(resultArrayTwoDataPresets=>{
      self.setState({dateTimeLineRaisa: resultArrayTwoDataPresets.rowsTimeLine});
    });   
    RequestTimelineData('Раиса2', 'http://172.16.20.75:8060/?generaltimeline=raisa2', AuthStr).then(resultArrayTwoDataPresets=>{
      self.setState({dateTimeLineRaisa2: resultArrayTwoDataPresets.rowsTimeLine});
    });
    RequestTimelineData('ФР05', 'http://172.16.20.75:8060/?generaltimeline=fr05', AuthStr).then(resultArrayTwoDataPresets=>{
      self.setState({dateTimeLineFR05: resultArrayTwoDataPresets.rowsTimeLine});
    });
    RequestTimelineData('ФР06', 'http://172.16.20.75:8060/?generaltimeline=fr06', AuthStr).then(resultArrayTwoDataPresets=>{
      self.setState({dateTimeLineFR06: resultArrayTwoDataPresets.rowsTimeLine});
    });
  }

  componentDidMount() {
    this.requestData();      
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
              columns={TimelineColumns}
              width="1200px"
              height="250px"
              options={{
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