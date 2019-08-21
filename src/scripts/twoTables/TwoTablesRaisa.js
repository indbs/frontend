import React                                        from 'react';
import Chart                                        from 'react-google-charts';
import                                                   '../style.css';
import {RequestTwoTablesData}                       from '../receivers/requestData';
import {TwoTablesColumnsHeat, TwoTablesColumnsGas}  from '../receivers/handleDataResponse';

export class TwoTablesRaisa extends React.Component{

  requestData(dataToRequest){
    const self = this;
    const AuthStr =JSON.parse(localStorage.getItem('currentUser'));
    
    RequestTwoTablesData('Раиса', 'HEAT', 'http://172.16.20.75:8060/?heat_table=raisa&program_number='+dataToRequest+'&year=2019', AuthStr).then(resultTwoTable=>{
      self.setState({dataTableHeat:   resultTwoTable.dataTable});
    }); 

    RequestTwoTablesData('Раиса', 'GAS', 'http://172.16.20.75:8060/?gas_table=raisa&program_number='+dataToRequest+'&year=2019', AuthStr).then(resultTwoTable=>{
      self.setState({dataTableGas:   resultTwoTable.dataTable});
    });    
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.programNumber !== nextProps.programNumber) {
      this.requestData(nextProps.programNumber);
    }
    else {
      this.requestData(this.props.programNumber);
    }
  }

  componentDidMount() {
    this.requestData(this.props.programNumber);  
  }
  
  render(){
    return (
      <div className={"my-global-div"} >
        <div id="artical" style={{'text-align':'left'}}>     
          <span className='hr5'>Обжиг N {this.props.programNumber} </span>
        </div> 
        <div id='tableHeat'>
          { this.state && this.state.dataTableHeat&&
            <Chart
              chartType="Table"
              chartLanguage = 'ru'
              rows={this.state.dataTableHeat}
              columns={TwoTablesColumnsHeat} 
              height="100%"
              options={{
                showRowNumber: false,
                allowHtml: true, 
                width:"800px"
              }}       
            />
          }
        </div>
        <br/>
        <div  id='tableGas'>
          { this.state && this.state.dataTableGas&& 
            <Chart
              chartType="Table"
              chartLanguage = 'ru'
              rows={this.state.dataTableGas}
              columns={TwoTablesColumnsGas} 
              height="100%"
              options={{
                showRowNumber: false,
                allowHtml: true, 
                width:"800px"
              }}       
            />
          }
        </div>             
      </div>
    );
  }
}
  
export default TwoTablesRaisa;