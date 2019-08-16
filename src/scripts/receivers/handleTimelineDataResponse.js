import {timelineCommonRowBurn, timelineCommonRowStop, timelineCommonRowStart, timelineCommonRowPauseLost} from './timelineCommonDataTracker';
import {tableCommonDataTracker} from '../receivers/tableCommonDataTracker';

export function handleResponseCommon (kilntype, response) {
  var HtmltooltipProperty='';
  switch (kilntype) {
    case 'Раиса'  : HtmltooltipProperty ='full';
    case 'Раиса2' : HtmltooltipProperty ='fullraisa2';
    case 'ФР05'   : HtmltooltipProperty ='fullfr';
    case 'ФР06'   : HtmltooltipProperty ='fullfr';
  }
  
  const rowsTimeLine=[], rowsTable=[];
  const dataTimeLine=response.data[1];

  for (let i = 0; i < dataTimeLine.length; i += 1) { 
    rowsTable.push(
      tableCommonDataTracker(kilntype, dataTimeLine[i])      
    );
    rowsTimeLine.push(
      timelineCommonRowBurn(kilntype, dataTimeLine[i], HtmltooltipProperty),   
      timelineCommonRowStop(kilntype, dataTimeLine[i], 'stop'),  
      timelineCommonRowStart(kilntype, dataTimeLine[i], 'start'),
    );
    if (i !== dataTimeLine.length-1) rowsTimeLine.push(timelineCommonRowPauseLost(kilntype, dataTimeLine[i], dataTimeLine[i + 1]));
  }

  return {rowsTimeLine: rowsTimeLine, rowsTable: rowsTable};
}