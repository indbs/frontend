import React, {Component} from 'react'
import {connect} from 'react-redux'
import selectContact from '../actions/action_select_contact'
import selectOven from '../actions/action_select_test'
import axios from 'axios';
import {bindActionCreators} from 'redux'
import { store } from "../store";
import './menu-list.css';

class MenuList extends Component {
   renderRaisa = (e) => {
    e.preventDefault();

    var res; 
  /*  const value =  axiosTest('http://172.16.20.75:8060/?generaltimeline=raisa'); */ 

    var value1 =  Promise.resolve (axiosTest('http://172.16.20.75:8060/?generaltimeline=raisa'));
  /*  ЗДЕсь от 26-07 Promisevalue как узнать у Promise*/ 
    res = value1.then(function(value) {return value });

    
    console.log("value2", res);
    console.log("value re raisa", value1);
    console.log("before CHANGE_VALUES", store.getState());
    this.props.selectOven('raisa',  value1);
    console.log("after CHANGE_VALUES", store.getState());
  }

  renderRaisa2 = (e) => {
    e.preventDefault();
     console.log ()
    
     //  const value = lastWork();

    //   this.props.selectOven('raisa2', value);
       
  }

  renderFR05 = (e) => {
    e.preventDefault();
  //  const value = lastWork('http://172.16.20.75:8060/?generaltimeline=fr05');
 //   this.props.selectOven('fr05', value);
  }

  renderFR06 = (e) => {
    e.preventDefault();
 //      const value = lastWork('http://172.16.20.75:8060/?generaltimeline=fr06');
   //    this.props.selectOven('fr06', value);
  }

  render() {
    return (
        <div className="btn-group">
         <form  className='butt' onSubmit={this.renderRaisa}><button  margin = '0' padding ='0'>Raisa</button> </form>
         <form className='butt' margin = '0' padding ='0'   onSubmit={this.renderRaisa2}>< button  >Raisa2</button> </form>
         <form className='butt' margin = '0' padding ='0'  onSubmit={this.renderFR05}><button>FR05</button> </form>
         <form className='butt'  margin = '0' padding ='0'  onSubmit={this.renderFR06}><button>FR06</button> </form>
      </div>
    );
  }
}


 async function handleResponse(url){
  var result = 0;
  console.log("result 1", result);
  result = await axiosTest(url);
  console.log("result 2", result);
}

async function axiosTest (url) {
  const data_url = url;
return await axios.get(data_url)
.then(function (response) {
         const dataTimeLine=response.data[1];  /*  [dataTimeLine.length-1].PROGRAM_NUMBER */ 
         const value = dataTimeLine[dataTimeLine.length-1].PROGRAM_NUMBER; 
         console.log("result 2", value);

         dispatch(        )

        return value;})
.catch(function (error) {
console.log(error);
});
}


/*
async function lastWork() {
  const data_url = 'http://172.16.20.75:8060/?generaltimeline=raisa';
  axios.get(data_url)
  .then(function (response) {
      const dataTimeLine=response.data[1];
      const value  = dataTimeLine[dataTimeLine.length-1].PROGRAM_NUMBER;  
      console.log ("answer", value);    
      return   dataTimeLine[dataTimeLine.length-1].PROGRAM_NUMBER;   
  })  
  }

  (async () => {
    console.log(await lastWork())
  })()

  */

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
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectOven: selectOven}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuList)