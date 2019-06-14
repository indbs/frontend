import * as React from "react";
<<<<<<< HEAD
import { render } from "react-dom";
import { Chart } from "react-google-charts";
import * as axios  from 'axios';
import InfoRaisa from './scripts/InfoRaisa';
import InfoRaisa2 from './scripts/InfoRaisa2';
import InfoFR05 from './scripts/InfoFR05';
import InfoFR06 from './scripts/InfoFR06';
import GraphRaisa from './scripts/GraphRaisa';
import GeneralTimeLine from './scripts/GeneralTimeLine';
import GraphTest from './scripts/GraphTest';


import Mouse from './Divs/Mouse';
import MouseWithCat from './Divs/MouseWithCat';
import Cat from './Divs/Cat';
import MainDiv from './Divs/MainDiv'; 
import MainDivTable from './Divs/MainDivTable';
import FlavorForm  from './Divs/FlavorForm';


function App()  {
 /* <MainDiv /> 
                           <MainDiv />  */
=======
import TimeLineRaisa from './scripts/TimeLineRaisa';
import TimeLineRaisa2 from './scripts/TimeLineRaisa2';
import TimeLineFR05 from './scripts/TimeLineFR05';
import TimeLineFR06 from './scripts/TimeLineFR06';
import GraphRaisa from './scripts/GraphRaisa';

function App()  {
>>>>>>> be01159d28fa0511f5ff274cc8efe171582c26d6

  return (
    /*<div className="App">
                           
<<<<<<< HEAD
    
                      
                          
                           < InfoRaisa    />
    </div>
=======
                           <TimeLineFR05  />
                           <TimeLineFR06  />
                           <TimeLineRaisa2 />
                           <TimeLineRaisa />
                           <GraphRaisa  value1={64}/> 
    </div>*/
  <div>
    <TimeLineRaisa />
    dfgdfg
    <GraphRaisa  value1={64}/>
  </div>
>>>>>>> be01159d28fa0511f5ff274cc8efe171582c26d6
  );
}

export default App;

/*
export default class App extends React.Component {
  render() {
    return (
      <div className={"my-pretty-chart-container"}>
        <Chart
          chartType="ScatterChart"
          data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
          width="100%"
          height="400px"
          legendToggle
        />
      </div>
    );
  }
}

//export default App;
render(<App />, document.querySelector("#app"));
*/
