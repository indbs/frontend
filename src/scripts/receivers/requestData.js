import {handleResponseCommon} from './handleTimelineDataResponse';
import axios from 'axios';

export function RequestTimelineDataData(kiln, data_url, AuthStr){
  return axios.get(data_url, {headers: {'Authorization': AuthStr.token}}).then(response=>handleResponseCommon(kiln, response));
}