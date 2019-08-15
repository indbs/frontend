import {timelineCommonRowBurn, timelineCommonRowStop, timelineCommonRowStart, timelineCommonRowPauseLost} from './timelineCommonDataTracker';

const kilnLabel = 'Раиса2';

export function timelineRaisa2RowBurn(dataTimeLineRow, burn){
  return timelineCommonRowBurn(kilnLabel, dataTimeLineRow, burn);
}

export function timelineRaisa2RowStop(dataTimeLineRow, stop){
  return timelineCommonRowStop(kilnLabel, dataTimeLineRow, stop);
}

export function timelineRaisa2RowStart(dataTimeLineRow, start){
  return timelineCommonRowStart(kilnLabel, dataTimeLineRow, start);
}

export function timelineRaisa2RowPauseLost(dataTimeLineRow, dataTimeLineNextRow){
  return timelineCommonRowPauseLost(kilnLabel, dataTimeLineRow, dataTimeLineNextRow);
}