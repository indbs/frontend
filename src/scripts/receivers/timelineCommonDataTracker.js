import React from 'react';
import moment from 'moment';
import HtmlToolTip from '../tooltips/Tooltip';
import timelineStyle from '../timelines/GeneralTimeLine.css';
var ReactDOMServer = require('react-dom/server');

/*
 Timeline data filler with custom tooltips
 Each burn present by few sections:
 |pause from (n-1) burn| + |start| + |(n) burn| + |stop|
 tooltips shows custom data on each section
*/

// Burn section on timeline
export function timelineCommonRowBurn(kilnLabel, dataTimeLineRow, HtmltooltipProperty){
  return [
    kilnLabel,
    dataTimeLineRow.PROGRAM_NUMBER.toString(),
    dataTimeLineRow.currentWork <= 300  ? timelineStyle.running_color : timelineStyle.burn_color,
    ReactDOMServer.renderToString(
      <HtmlToolTip 
        toolTipData={dataTimeLineRow}
        toolTipType={HtmltooltipProperty}
      />),
    new Date(dataTimeLineRow.STARTUP_TIME),
    new Date(dataTimeLineRow.end_time)
  ]
}

// Stop section on timeline
export function timelineCommonRowStop(kilnLabel, dataTimeLineRow, stop){
  return [
    kilnLabel,  
    '',
    timelineStyle.stop_color,
    ReactDOMServer.renderToString(<HtmlToolTip 
      toolTipData={dataTimeLineRow}
      toolTipType={stop}
    />),
    new Date(dataTimeLineRow.end_time),
    new Date(moment(dataTimeLineRow.end_time).add(1, 'hours')),
  ]
}

// Start section on timeline
export function timelineCommonRowStart(kilnLabel, dataTimeLineRow, start){
  return [
    kilnLabel, 
    '',
    timelineStyle.start_color,
    ReactDOMServer.renderToString(<HtmlToolTip 
      toolTipData={dataTimeLineRow}
      toolTipType={start}
      />),	            
    new Date(moment(dataTimeLineRow.STARTUP_TIME ).subtract(1, 'hours')),
    new Date(dataTimeLineRow.STARTUP_TIME)
  ]
}

// Pause section on timeline
export function timelineCommonRowPauseLost(kilnLabel, dataTimeLineRow, dataTimeLineNextRow){
  return [
    kilnLabel,  
    '',
    dataTimeLineRow.pause === '00:00:00' ?  timelineStyle.lost_color : timelineStyle.pause_color,
    dataTimeLineRow.pause === '00:00:00' ?  ReactDOMServer.renderToString(
    <HtmlToolTip 
      toolTipData={dataTimeLineNextRow}
      toolTipType={"lost"}
    />) :   ReactDOMServer.renderToString(
      <HtmlToolTip 
        toolTipData={dataTimeLineNextRow}
        toolTipType={"pause"}
      />),
    new Date(moment(dataTimeLineRow.end_time).add(1, 'hours')),	
    new Date(moment(dataTimeLineNextRow.STARTUP_TIME).subtract(1, 'hours'))	
  ]
}