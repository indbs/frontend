import {timelineCommonRowBurn, timelineCommonRowStop, timelineCommonRowStart, timelineCommonRowPauseLost} from './timelineCommonDataTracker';

const kilnLabel = 'Раиса';

export function timelineRaisaRowBurn(dataTimeLineRow, burn){
  return timelineCommonRowBurn(kilnLabel, dataTimeLineRow, burn);
}

export function timelineRaisaRowStop(dataTimeLineRow, stop){
  return timelineCommonRowStop(kilnLabel, dataTimeLineRow, stop);
}

export function timelineRaisaRowStart(dataTimeLineRow, start){
  return timelineCommonRowStart(kilnLabel, dataTimeLineRow, start);
}

export function timelineRaisaRowPauseLost(dataTimeLineRow, dataTimeLineNextRow){
  return timelineCommonRowPauseLost(kilnLabel, dataTimeLineRow, dataTimeLineNextRow);
}