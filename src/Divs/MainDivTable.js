import React from 'react';
//import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import axios from 'axios';
import ChildDivTable from './ChildDivTable';



export class MainDivTable extends React.Component{
    

    constructor(props) {
        super(props);
        this.state = { valuePass: "12" };
      
     
      }

   
    

      
render(){
    return (
<div className={"my-global-div"} >
       
        <Chart
        width={'500px'}
        height={'300px'}
        chartType="Table"
        loader={<div>Loading Chart</div>}
        data={[
            [
            { type: 'string', label: 'Name' },
            { type: 'number', label: 'Salary' },
            { type: 'boolean', label: 'Full Time Employee' },
            ],
            ['Mike', { v: 10000, f: '$10,000' }, true],
            ['Jim', { v: 8000, f: '$8,000' }, false],
            ['Alice', { v: 12500, f: '$12,500' }, true],
            ['Bob', { v: 7000, f: '$7,000' }, true],
        ]}
        options={{
            colors: ['#98719D', '#A0BD85', '#5DBAD9'],
            showRowNumber: true,
            allowHtml: true, 
        }}  
        formatters={[
         {
            type: 'PatternFormat',
            column: [1],
            options: '<a href=ChildDivTable%20?{this.state.valuePass}={0}>{0} </a>' , 
          
         },  
       ]}

     ></Chart> 
        < ChildDivTable valuePass={this.state} />
    
</div>
);
}
}
  
export default MainDivTable;