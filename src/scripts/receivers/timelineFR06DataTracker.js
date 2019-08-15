import React from 'react';
import HtmlToolTip from '../tooltip';
import moment from 'moment';
import timelineStyle from '../GeneralTimeLine.css';

var ReactDOMServer = require('react-dom/server');

export function timelineFR06RowBurn(dataTimeLineRow, burn){
  return [
    'ФР06',
    dataTimeLineRow.PROGRAM_NUMBER.toString(),
    dataTimeLineRow.currentWork <= 300  ? timelineStyle.running_color : timelineStyle.burn_color,
    ReactDOMServer.renderToString(
        <HtmlToolTip 
          toolTipData={dataTimeLineRow}
          toolTipType={burn}
        />),
    new Date(dataTimeLineRow.STARTUP_TIME),
    new Date(dataTimeLineRow.end_time)
  ]
}

export function timelineFR06RowStop(dataTimeLineRow, stop){
  return [
    'ФР06',  
    dataTimeLineRow.PROGRAM_NUMBER.toString(),
    timelineStyle.stop_color,
    ReactDOMServer.renderToString(<HtmlToolTip 
        toolTipData={dataTimeLineRow}
        toolTipType={stop}
      />),
    new Date(dataTimeLineRow.end_time),
    new Date(moment(dataTimeLineRow.end_time ).add(1, 'hours')),
  ]
}

export function timelineFR06RowStart(dataTimeLineRow, start){
  return [
    'ФР06', 
    ' ',
    timelineStyle.start_color,
    ReactDOMServer.renderToString(<HtmlToolTip 
      toolTipData={dataTimeLineRow}
      toolTipType={start}
      />),	            
    new Date(moment(dataTimeLineRow.STARTUP_TIME ).subtract(1, 'hours')),
    new Date(dataTimeLineRow.STARTUP_TIME)
  ]
}

export function timelineFR06RowPauseLost(dataTimeLineRow, dataTimeLineNextRow){
  return [
    'ФР06',  
    ' ',
    dataTimeLineRow.pause  === '00:00:00' ?  timelineStyle.lost_color : timelineStyle.pause_color,
    dataTimeLineRow.pause === '00:00:00' ?   ReactDOMServer.renderToString(
    <HtmlToolTip 
      toolTipData={dataTimeLineNextRow}
      toolTipType={"lost"}
    />) :   ReactDOMServer.renderToString(
      <HtmlToolTip 
        toolTipData={dataTimeLineNextRow}
        toolTipType={"pause"}
      />),
    new Date(moment(dataTimeLineRow.end_time ).add(1, 'hours')),	
    new Date(moment(dataTimeLineNextRow.STARTUP_TIME ).subtract(1, 'hours'))	
  ]
}