import {timelineCommonRowBurn, timelineCommonRowStop, timelineCommonRowStart, timelineCommonRowPauseLost} from './timelineCommonDataTracker';

const kilnLabel = 'ФР05';

export function timelineFR05RowBurn(dataTimeLineRow, burn){
  return timelineCommonRowBurn(kilnLabel, dataTimeLineRow, burn);
}

export function timelineFR05RowStop(dataTimeLineRow, stop){
  return timelineCommonRowStop(kilnLabel, dataTimeLineRow, stop);
}

export function timelineFR05RowStart(dataTimeLineRow, start){
  return timelineCommonRowStart(kilnLabel, dataTimeLineRow, start);
}

export function timelineFR05RowPauseLost(dataTimeLineRow, dataTimeLineNextRow){
  return timelineCommonRowPauseLost(kilnLabel,dataTimeLineRow, dataTimeLineNextRow);
}