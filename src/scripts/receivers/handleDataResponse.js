import {
  timelineCommonRowBurn, 
  timelineCommonRowStop, 
  timelineCommonRowStart, 
  timelineCommonRowPauseLost}           from './timelineCommonDataTracker';
import {tableCommonDataTracker}         from './tableCommonDataTracker';
import {graphCommonRow}                 from './graphCommonDataTracker';
import {TwoTablesCommonRow}             from './twoTablesCommonDataTracker';

export const TimelineColumns = [
  { type: "string", id: "Role" },
  { type: "string", id: "Name" },
  { type: "string", id: 'style', role: 'style' },
  { type: 'string', role: 'tooltip','p': {'html': true}},
  { type: 'date',   id: 'Start' },
  { type: 'date',   id: 'Stop' }
];

export const TwoTablesColumnsHeat = [
  { type: "number", label:  "Шаг" },
  { type: "number", label:  "Режим нагрева" },
  { type: "number", label:  "Температура, °С" },
  { type: "string", label:  "Время Шага" },
];

export const TwoTablesColumnsGas = [
  { type: "number", label:  "Шаг" },
  { type: "number", label:  "Режим нагрева" },
  { type: "number", label:  "Возд, м³/час" },
  { type: "string", label:  "Кислород, %" },
  { type: "string", label:  "Время Шага" },
];

export function handleTimelineResponseCommon (kilntype, response) {
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

export function handleGraphResponseCommon (kilntype, response) {
  const dataTable=response.data;
  const chartDataAll= [[
    { type: 'date', label: 'Время'},
    'Азот SP, %',
    'Азот PV, %',
    'SP',
    'Средняя °С',
    'Ток L1, А',
    'Ток L2, А',
    'Ток L3, А', 
    'TC411, °С',
    'TC412, °С',
    'TC413, °С',
    'A, %', 
    'B, %', 
    'C, %',
    'D, %',
    'E, %' 
  ]];
  var chartDataShort=[], chartDataCurrents=[], chartDataAirHeaters=[];

  for (let i = 0; i < dataTable.length-1; i += 1) {
    chartDataAll.push(graphCommonRow(kilntype, dataTable[i]));
  }
  
  chartDataShort      = chartDataAll.map(function(row){return row.slice(0,5)});
  chartDataCurrents   = chartDataAll.map(function(row){return row.slice(0,9)});
  chartDataAirHeaters = chartDataAll.map(function(row){return [...row.slice(0,5),...row.slice(8,11)]});
  
  return {chartDataAll: chartDataAll, chartDataShort: chartDataShort, chartDataCurrents: chartDataCurrents, chartDataAirHeaters: chartDataAirHeaters};
}

export function handleTwoTablesResponseCommon (kilntype, HeatOrGasParameter, response) {
  const rowsTable=[];
  const dataTable=response.data;
  for (let i = 0; i < dataTable.length; i += 1) {         
    rowsTable.push(
      TwoTablesCommonRow(kilntype, HeatOrGasParameter, dataTable[i])
    );
  }

  return {dataTable: rowsTable};
}