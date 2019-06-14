import * as React from "react";
import { render } from "react-dom";
import { Chart } from "react-google-charts";
import * as axios  from 'axios';
import InfoRaisa from './scripts/InfoRaisa';
import InfoRaisa2 from './scripts/InfoRaisa2';
import InfoFR05 from './scripts/InfoFR05';
import InfoFR06 from './scripts/InfoFR06';

import GeneralTimeLine from './scripts/GeneralTimeLine';
import GraphTest from './scripts/GraphTest';


import Mouse from './Divs/Mouse';
import MouseWithCat from './Divs/MouseWithCat';
import Cat from './Divs/Cat';
import MainDiv from './Divs/MainDiv'; 
import MainDivTable from './Divs/MainDivTable';
import FlavorForm  from './Divs/FlavorForm';


function App()  {


  return (
    <div className="App">
                           
    
                      
                          
                           < InfoRaisa    />
    </div>
  );
}

export default App;



