import * as React from "react";
import TimeLineRaisa from './scripts/TimeLineRaisa';
import TimeLineRaisa2 from './scripts/TimeLineRaisa2';
import TimeLineFR05 from './scripts/TimeLineFR05';
import TimeLineFR06 from './scripts/TimeLineFR06';
import GraphRaisa from './scripts/GraphRaisa';

function App()  {

  return (
    /*<div className="App">
                           
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
