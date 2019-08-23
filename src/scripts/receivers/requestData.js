import {
  handleTimelineResponseCommon, 
  handleGraphResponseCommon, 
  handleTwoTablesResponseCommon }         from './handleDataResponse';
import axios                              from 'axios';

export function RequestTimelineData(kiln, data_url, AuthStr){
  return axios.get(data_url, {headers: {'Authorization': AuthStr.token}}).then(response=>handleTimelineResponseCommon(  kiln, response));
}

export function RequestGraphData(kiln, data_url, AuthStr){
  return axios.get(data_url, {headers: {'Authorization': AuthStr.token}}).then(response=>handleGraphResponseCommon(     kiln, response));
}

export function RequestTwoTablesData(kiln, HeatOrGasParameter, data_url, AuthStr){
  return axios.get(data_url, {headers: {'Authorization': AuthStr.token}}).then(response=>handleTwoTablesResponseCommon( kiln, HeatOrGasParameter, response));
}