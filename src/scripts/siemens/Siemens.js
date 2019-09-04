import React from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';
import GraphTrend from '../graphs/GraphTrend';
import '../style.css';
import './Siemens.css';

// Need to redesign like a Raisa module.
export class Siemens extends React.Component {

    constructor(props) {
        super(props);
        this.state = { valueTrend: "242"  };   
      }
      requestData(){
        const self = this;
        const data_url241 = "http://172.16.20.75:8060/?siemens=analiser&year=2019&channel_number=241";
        const data_url181 = "http://172.16.20.75:8060/?siemens=analiser&year=2019&channel_number=181";
        const data_url161 = "http://172.16.20.75:8060/?siemens=analiser&year=2019&channel_number=161";
        const data_url242 = "http://172.16.20.75:8060/?siemens=analiser&year=2019&channel_number=242";
        const data_url182 = "http://172.16.20.75:8060/?siemens=analiser&year=2019&channel_number=182";
        const data_url162 = "http://172.16.20.75:8060/?siemens=analiser&year=2019&channel_number=162";
        const chartData241 =[];
        const chartData181 =[];
        const chartData161 =[];
        const chartData242 =[];
        const chartData182 =[];
        const chartData162 =[];

        axios.get(data_url241)
                .then(function (response) {
                    const dataTable=response.data;
                    for (let i = 0; i < dataTable.length; i += 1) {
                        chartData241.push([
                            dataTable[i].concentration,             
                        ]);   
                    }
                    self.setState({data241: chartData241}); 
                })
        axios.get(data_url181)
                .then(function (response) {
                      const dataTable=response.data;
                      for (let i = 0; i < dataTable.length; i += 1) {
                          chartData181.push([
                              dataTable[i].concentration,             
                          ]);   
                      }
                  self.setState({data181: chartData181}); 

                })
        axios.get(data_url161)
                .then(function (response) {
                      const dataTable=response.data;
                      for (let i = 0; i < dataTable.length; i += 1) {
                          chartData161.push([
                              dataTable[i].concentration,             
                          ]);   
                      }
                  self.setState({data161: chartData161}); 
                })
        axios.get(data_url242)
                .then(function (response) {
                      const dataTable=response.data;
                      for (let i = 0; i < dataTable.length; i += 1) {
                          chartData242.push([
                              dataTable[i].concentration,             
                          ]);   
                      }
                  self.setState({data242: chartData242}); 
                })
         axios.get(data_url182)
                .then(function (response) {
                      const dataTable=response.data;
                      for (let i = 0; i < dataTable.length; i += 1) {
                          chartData182.push([
                              dataTable[i].concentration,             
                          ]);   
                      }
                  self.setState({data182: chartData182}); 
                })   
            axios.get(data_url162)
                .then(function (response) {
                      const dataTable=response.data;
                      for (let i = 0; i < dataTable.length; i += 1) {
                          chartData162.push([
                              dataTable[i].concentration,             
                          ]);   
                      }
                  self.setState({data162: chartData162}); 
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });     
    }

    componentDidMount() {
        this.requestData();    
    }
    

    render() {
        var s241 = Number(this.state.data241);
        var s181 = Number(this.state.data181);
        var s161 = Number(this.state.data161);
        var s242 = Number(this.state.data242);
        var s182 = Number(this.state.data182);
        var s162 = Number(this.state.data162);
      return (
        <div className="SimensPage">  
                        <div className="SimensTitle" id="chart_div_title">
                        <hr1>Сименс</hr1>
                        <br />
                        <hr3>Данные на момент </hr3>
                        <br />
                        <hr4>Первый канал</hr4>
                        <br />
                        <hr5>Концентрация азота в %</hr5>
                        <br />
                        </div>
                        <div className="Simens241" id="chart_div">
                        {this.state&&this.state.data241&&<Chart
                            width="100%"
                            height="110%"
                            chartType="Gauge"
                            chartLanguage = 'ru'
                            loader={<div>Загружаем данные...</div>} 
                            data={[
                                ['Label', 'Value'],
                                ['Зона 24',s241],
                                ['Зона 18',s181],
                                ['Зона 16',s161],
                              ]}
                            legend_toggle={true}
                            options={{
                              width: 400, height: 150,
                              redFrom: 0.008, redTo: 0.01,
                              redColor: '#5882FA',
                              yellowFrom:0.006, yellowTo: 0.008,
                              yellowColor:'#819FF7',
                              greenFrom: 0.004, greenTo: 0.006,
                              greenColor:'#CED8F6',
                              majorTicks: ['0', '.002','.004','.006','0.008', '0.01' ],
                              minorTicks: 10,
                              min: 0,
                              max: 0.01 
                              }} 
                     />
                        }
                </div>      
                  <div className="Buttons_2" id="chart_div_buttons">{this.state&&this.state.data241&&this.state.data181&&this.state.data161&&
                  <button className='butt'  onClick={() =>this.setState({ valueTrend: "241" })}>ТРЕНД 1-241</button> }
                  {this.state&&this.state.data241&&this.state.data181&&this.state.data161&&
                  <button className='butt'  onClick={() =>this.setState({ valueTrend: "181" })}>ТРЕНД 1-181</button> }
                  {this.state&&this.state.data241&&this.state.data181&&this.state.data161&&
                  <button className='butt'  onClick={() =>this.setState({ valueTrend: "161" })}>ТРЕНД 1-161</button> }
                  </div> 
                <div className="simens2" id="chart_div2">
                <div className="SimensTitle" id="chart_div_title">
                        <hr4>Второй канал</hr4>
                        <br />
                        <hr5>Концентрация азота в %</hr5>
                        <br />
                        </div>  
              <div className="Simens162" id="chart_div">  
                {this.state&&this.state.data242&&<Chart
                            width="100%"
                            height="110%"
                            chartType="Gauge"
                            chartLanguage = 'ru'
                            loader={<div>Загружаем данные...</div>} 
                            data={[
                                ['Label', 'Value'],
                                ['Зона 24',s242],
                                ['Зона 18',s182],
                                ['Зона 16',s162],
                              ]}
                            legend_toggle={true}
                            options={{
                              width: 400, height: 150,
                              redFrom: 0.008, redTo: 0.01,
                              redColor: '#5882FA',
                              yellowFrom:0.006, yellowTo: 0.008,
                              yellowColor:'#819FF7',
                              greenFrom: 0.004, greenTo: 0.006,
                              greenColor:'#CED8F6',
                              majorTicks: ['0', '.002','.004','.006','0.008', '0.01' ],
                              minorTicks: 10,
                              min: 0,
                              max: 0.01 
                              }} 
                     />
                        }
                </div>     
                  <div className="Buttons_2" id="chart_div_buttons"> {this.state&&this.state.data242&&this.state.data182&&this.state.data162&&
                  <button className='butt'  onClick={() =>this.setState({ valueTrend: "242" })}>ТРЕНД 1-242</button> }
                  {this.state&&this.state.data242&&this.state.data182&&this.state.data162&&
                  <button className='butt'  onClick={() =>this.setState({ valueTrend: "182" })}>ТРЕНД 1-182</button> }
                  {this.state&&this.state.data242&&this.state.data182&&this.state.data162&&
                  <button className='butt'  onClick={() =>this.setState({ valueTrend: "162" })}>ТРЕНД 1-162</button> }
                </div> 
               </div>
                <div className={"my-graphTrend-div"}>
                  <GraphTrend    valueTrend={this.state.valueTrend}  />
                </div>  

        </div>
      );
    }
  }
  export default Siemens;