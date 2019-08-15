import {timelineRaisaRowBurn, timelineRaisaRowStop, timelineRaisaRowStart, timelineRaisaRowPauseLost} from './timelineRaisaDataTracker';
import {timelineRaisa2RowBurn, timelineRaisa2RowStop, timelineRaisa2RowStart, timelineRaisa2RowPauseLost} from './timelineRaisa2DataTracker';
import {timelineFR05RowBurn, timelineFR05RowStop, timelineFR05RowStart, timelineFR05RowPauseLost} from './timelineFR05DataTracker';
import {timelineFR06RowBurn, timelineFR06RowStop, timelineFR06RowStart, timelineFR06RowPauseLost} from './timelineFR06DataTracker';

export function handleResponseRaisa (response) {
  const rowsTimeLine=[];
  const dataTimeLine=response.data[1];
  console.log('dataTimeLine before pushed ', dataTimeLine);
  for (let i = 0; i < dataTimeLine.length; i += 1) { 
    rowsTimeLine.push(
      timelineRaisaRowBurn(dataTimeLine[i], 'full'),   
      timelineRaisaRowStop(dataTimeLine[i], 'stop'),  
      timelineRaisaRowStart(dataTimeLine[i], 'start'),
    );
    if (i !== dataTimeLine.length-1) rowsTimeLine.push(timelineRaisaRowPauseLost(dataTimeLine[i], dataTimeLine[i + 1]));
  }
  return rowsTimeLine;
}

export function handleResponseRaisa2 (response) {
  const rowsTimeLine=[];
  const dataTimeLine=response.data[1];
  for (let i = 0; i < dataTimeLine.length; i += 1) {
    rowsTimeLine.push(
      timelineRaisa2RowBurn(dataTimeLine[i], 'fullraisa2'), 
      timelineRaisa2RowStop(dataTimeLine[i], 'stop'),
      timelineRaisa2RowStart(dataTimeLine[i], 'start'),
    );
    if (i !== dataTimeLine.length-1) rowsTimeLine.push(timelineRaisa2RowPauseLost(dataTimeLine[i], dataTimeLine[i + 1]));
  }
  return rowsTimeLine;
}

export function handleResponseFR05 (response) {
  const rowsTimeLine=[];
  const dataTimeLine=response.data[1];
  for (let i = 0; i < dataTimeLine.length; i += 1) {
    rowsTimeLine.push(
      timelineFR05RowBurn(dataTimeLine[i], 'fullfr'),
      timelineFR05RowStop(dataTimeLine[i], 'stop'), 
      timelineFR05RowStart(dataTimeLine[i], 'start'), 
    );
    if (i !== dataTimeLine.length-1) rowsTimeLine.push(timelineFR05RowPauseLost(dataTimeLine[i], dataTimeLine[i + 1]));
  }
  return rowsTimeLine;      
}

export function handleResponseFR06 (response) {
  const rowsTimeLine=[];
  const dataTimeLine=response.data;
  for (let i = 0; i < dataTimeLine.length; i += 1) {
    rowsTimeLine.push(
      timelineFR06RowBurn(dataTimeLine[i], 'fullfr'),
      timelineFR06RowStop(dataTimeLine[i], 'stop'),
      timelineFR06RowStart(dataTimeLine[i], 'start'),
    );
    if (i !== dataTimeLine.length-1) rowsTimeLine.push(timelineFR06RowPauseLost(dataTimeLine[i], dataTimeLine[i + 1]));
  }
  return rowsTimeLine;
}