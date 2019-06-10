import React from 'react';
//import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import axios from 'axios';
import ChildDiv from './ChildDiv';





export class MainDiv extends React.Component{
    


    constructor(props) {
            super(props);
            this.state = { valuePass: "12" };
            this.handleChange = this.handleChange.bind(this);
           /* this.handleSubmit = this.handleSubmit.bind(this);*/
    }

          handleChange(value) {
            this.setState({ valuePass: value });
          }
       

          chartEvents =[
            {
            eventName: "select",
            callback  : ({chartWrapper}) => { 
                   var selection = chartWrapper.getChart().getSelection();
                   var value = chartWrapper.getDataTable().getValue(selection[0].row,1);     
                   this.handleChange(value);
                    }
               }
            ];
          
    render(){
      
        return (
         
    <div className={"my-global-div"} >
                <Chart  value={this.state.valuePass} onChange={this.handleChange.bind(this)}
            width={'500px'}
            height={'300px'}
            chartType="Timeline"
            loader={<div>Loading Chart</div>}
            data={[
                [
                  { type: 'string', id: 'Term' },
                  { type: "string", id: "Name" },
                  { type: 'date', id: 'Start' },
                  { type: 'date', id: 'End' },
                ],
                ['1', '33', new Date(1789, 3, 30), new Date(1797, 2, 4)],
                ['2', '22', new Date(1797, 2, 4), new Date(1801, 2, 4)],
                ['3', '17', new Date(1801, 2, 4), new Date(1809, 2, 4)],
              ]}
            options={{
                showRowNumber: true,
            }}

            chartEvents={this.chartEvents }
           
            
            ></Chart>
        
            <ChildDiv commonValue={this.state} />
   </div>
   );
    }
  }
  
export default MainDiv;