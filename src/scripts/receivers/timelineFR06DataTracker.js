import {timelineCommonRowBurn, timelineCommonRowStop, timelineCommonRowStart, timelineCommonRowPauseLost} from './timelineCommonDataTracker';

const kilnLabel = 'ФР06';

export function timelineFR06RowBurn(dataTimeLineRow, burn){
  return timelineCommonRowBurn(kilnLabel, dataTimeLineRow, burn);
}

export function timelineFR06RowStop(dataTimeLineRow, stop){
  return timelineCommonRowStop(kilnLabel, dataTimeLineRow, stop);
}

export function timelineFR06RowStart(dataTimeLineRow, start){
  return timelineCommonRowStart(kilnLabel, dataTimeLineRow, start);
}

export function timelineFR06RowPauseLost(dataTimeLineRow, dataTimeLineNextRow){
  return timelineCommonRowPauseLost(kilnLabel, dataTimeLineRow, dataTimeLineNextRow);
}