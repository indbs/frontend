import {handleResponseRaisa, handleResponseRaisa2, handleResponseFR05, handleResponseFR06} from './handleTimelineDataResponse';
import axios from 'axios';

export function RequestDataRaisa(data_url_raisa, AuthStr){
  return axios.get(data_url_raisa, {headers: {'Authorization': AuthStr.token}}).then(response=>handleResponseRaisa(response));
}

export function RequestDataRaisa2(data_url_raisa2, AuthStr){
  return axios.get(data_url_raisa2, {headers: {'Authorization': AuthStr.token}}).then(response=>handleResponseRaisa2(response));
}

export function RequestDataFR05(data_url_fr05, AuthStr){
  return axios.get(data_url_fr05, {headers: {'Authorization': AuthStr.token}}).then(response=>handleResponseFR05(response));
}

export function RequestDataFR06(data_url_fr06, AuthStr){
  return axios.get(data_url_fr06, {headers: {'Authorization': AuthStr.token}}).then(response=>handleResponseFR06(response));
}