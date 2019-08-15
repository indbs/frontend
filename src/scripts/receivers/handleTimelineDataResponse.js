import React from 'react';
import HtmlToolTip from '../tooltip';
import moment from 'moment';

var ReactDOMServer = require('react-dom/server');

export function handleResponseRaisa (response) {
  const rowsTimeLine=[];
  const dataTimeLine=response.data[1];
  const minValue=(Date.today().addMonths(-1));
  for (let i = 0; i < dataTimeLine.length; i += 1) {
    if (Date.compare(new Date(dataTimeLine[i].STARTUP_TIME), minValue)===1){
      if ( i < dataTimeLine.length-1) {
        rowsTimeLine.push(
          [
            'Раиса',
            dataTimeLine[i].PROGRAM_NUMBER.toString(),
            dataTimeLine[i].currentWork <= 300  ? '#50D050' :'#b0d1f2',
            ReactDOMServer.renderToString(
                <HtmlToolTip 
                  toolTipData={dataTimeLine[i]}
                  toolTipType={"full"}
                />),
            new Date(dataTimeLine[i].STARTUP_TIME),
            new Date(dataTimeLine[i].end_time)
          ],   
          [
            'Раиса',  
            ' ',
            '#003366',
            ReactDOMServer.renderToString(<HtmlToolTip 
                toolTipData={dataTimeLine[i]}
                toolTipType={"stop"}
              />),
            new Date(dataTimeLine[i].end_time),
            new Date(moment( dataTimeLine[i].end_time ).add(0.1, 'hours')),
          ],  
          [
            'Раиса', 
            ' ',
            '#0080ff',
            ReactDOMServer.renderToString(<HtmlToolTip 
              toolTipData={dataTimeLine[i]}
              toolTipType={"start"}
              />)  ,	            
            new Date(moment( dataTimeLine[i].STARTUP_TIME ).subtract(0.1, 'hours')),
            new Date(dataTimeLine[i].STARTUP_TIME)
          ],
          [
            'Раиса',  
            ' ',
            dataTimeLine[i].pause  === '00:00:00' ? '#708090' :'#d9e6f2',
            dataTimeLine[i].pause === '00:00:00' ?   ReactDOMServer.renderToString(
            <HtmlToolTip 
              toolTipData={dataTimeLine[i+1]}
              toolTipType={"lost"}
            />) :   ReactDOMServer.renderToString(
                <HtmlToolTip 
                  toolTipData={dataTimeLine[i+1]}
                  toolTipType={"pause"}
                />),
            new Date(moment( dataTimeLine[i].end_time ).add(0.1, 'hours')),	
            new Date(moment( dataTimeLine[i+1].STARTUP_TIME ).subtract(0.1, 'hours'))	  
          ]   
        );
      }
    } 
    else{
      rowsTimeLine.push(
        [
          'Раиса',
          dataTimeLine[i].PROGRAM_NUMBER.toString(),
          dataTimeLine[i].currentWork <= 300  ? '#50D050' :'#b0d1f2',
          ReactDOMServer.renderToString(
              <HtmlToolTip 
                toolTipData={dataTimeLine[i]}
                toolTipType={"full"}
              />),
          new Date(dataTimeLine[i].STARTUP_TIME),
          new Date(dataTimeLine[i].end_time)
        ],
        [
          'Раиса',  
          ' ',
          '#003366',
          ReactDOMServer.renderToString(<HtmlToolTip 
              toolTipData={dataTimeLine[i]}
              toolTipType={"stop"}
            />),
          new Date(dataTimeLine[i].end_time),
          new Date(moment( dataTimeLine[i].end_time ).add(0.1, 'hours')),
        ],  
        [
          'Раиса', 
          ' ',
          '#0080ff',
          ReactDOMServer.renderToString(<HtmlToolTip 
              toolTipData={dataTimeLine[i]}
              toolTipType={"start"}
            />)  ,	            
          new Date(moment( dataTimeLine[i].STARTUP_TIME ).subtract(0.1, 'hours')),
          new Date(dataTimeLine[i].STARTUP_TIME)
        ]  
      );
    }
    }
    return rowsTimeLine;
  }

export function handleResponseRaisa2 (response) {
  const rowsTimeLine=[];
  const dataTimeLine=response.data[1];
  const minValue=(Date.today().addMonths(-1));

  for (let i = 0; i < dataTimeLine.length; i += 1) {
    if (Date.compare(new Date(dataTimeLine[i].STARTUP_TIME),minValue)===1){ 
      if (i < dataTimeLine.length-1) {
        rowsTimeLine.push(
          [
            'Раиса2',
            dataTimeLine[i].PROGRAM_NUMBER.toString(),
            dataTimeLine[i].currentWork <= 300  ? '#50D050' :'#b0d1f2',
            ReactDOMServer.renderToString(
                <HtmlToolTip 
                  toolTipData={dataTimeLine[i]}
                  toolTipType={"fullraisa2"}
                />),
            new Date(dataTimeLine[i].STARTUP_TIME),
            new Date(dataTimeLine[i].end_time)
          ],
          [
            'Раиса2',  
            dataTimeLine[i].PROGRAM_NUMBER.toString(),
            '#003366',
            ReactDOMServer.renderToString(<HtmlToolTip 
                toolTipData={dataTimeLine[i]}
                toolTipType={"stop"}
              />),
            new Date(dataTimeLine[i].end_time),
            new Date(moment( dataTimeLine[i].end_time ).add(1, 'hours')),
          ],  
          [
            'Раиса2', 
            ' ',
            '#0080ff',
            ReactDOMServer.renderToString(<HtmlToolTip 
              toolTipData={dataTimeLine[i]}
              toolTipType={"start"}
              />) ,	            
            new Date(moment( dataTimeLine[i].STARTUP_TIME ).subtract(1, 'hours')),
            new Date(dataTimeLine[i].STARTUP_TIME)
          ],
          [
            'Раиса2',  
            ,
            dataTimeLine[i].pause  === '00:00:00' ? '#708090' :'#d9e6f2',
            dataTimeLine[i].pause === '00:00:00' ?   ReactDOMServer.renderToString(
            <HtmlToolTip 
              toolTipData={dataTimeLine[i+1]}
              toolTipType={"lost"}
            />) :   ReactDOMServer.renderToString(
                <HtmlToolTip 
                  toolTipData={dataTimeLine[i+1]}
                  toolTipType={"pause"}
              />),
            new Date(moment( dataTimeLine[i].end_time ).add(1, 'hours')),	
            new Date(moment( dataTimeLine[i+1].STARTUP_TIME ).subtract(1, 'hours'))	 
          ]  
        );
      }
      else {
        rowsTimeLine.push(
          [
            'Раиса2',
            dataTimeLine[i].PROGRAM_NUMBER.toString(),
            dataTimeLine[i].currentWork <= 300  ? '#50D050' :'#b0d1f2',
            ReactDOMServer.renderToString(
                <HtmlToolTip 
                  toolTipData={dataTimeLine[i]}
                  toolTipType={"fullraisa2"}
                />),
            new Date(dataTimeLine[i].STARTUP_TIME),
            new Date(dataTimeLine[i].end_time)
          ],
          [
            'Раиса2',  
            ' ',
            '#003366',
            ReactDOMServer.renderToString(<HtmlToolTip 
                toolTipData={dataTimeLine[i]}
                toolTipType={"stop"}
              />),
            new Date(dataTimeLine[i].end_time),
            new Date(moment( dataTimeLine[i].end_time ).add(1, 'hours')),
          ],  
          [
            'Раиса2', 
            ' ',
            '#0080ff',
            ReactDOMServer.renderToString(<HtmlToolTip 
              toolTipData={dataTimeLine[i]}
              toolTipType={"start"}
              />) ,	            
            new Date(moment( dataTimeLine[i].STARTUP_TIME ).subtract(1, 'hours')),
            new Date(dataTimeLine[i].STARTUP_TIME)
          ]
        );
      } 
    }  
  }
  return rowsTimeLine;
}

export function handleResponseFR05 (response) {
  const rowsTimeLine=[];
  const dataTimeLine=response.data[1];
  const minValue=(Date.today().addMonths(-1));
  for (let i = 0; i < dataTimeLine.length; i += 1) {
    if (Date.compare(new Date(dataTimeLine[i].STARTUP_TIME),minValue)===1){
      if (i < dataTimeLine.length-1) {
        rowsTimeLine.push(
          [
            'ФР05',
            dataTimeLine[i].PROGRAM_NUMBER.toString(),
            dataTimeLine[i].currentWork <= 300  ? '#50D050' :'#b0d1f2',
            ReactDOMServer.renderToString(
                <HtmlToolTip 
                  toolTipData={dataTimeLine[i]}
                  toolTipType={"fullfr"}
                />),
            new Date(dataTimeLine[i].STARTUP_TIME),
            new Date(dataTimeLine[i].end_time)
          ],
          [
            'ФР05',  
            dataTimeLine[i].PROGRAM_NUMBER.toString(),
            '#003366',
            ReactDOMServer.renderToString(<HtmlToolTip 
                toolTipData={dataTimeLine[i]}
                toolTipType={"stop"}
              />),
            new Date(dataTimeLine[i].end_time),
            new Date(moment( dataTimeLine[i].end_time ).add(1, 'hours')),
          ],  
          [
            'ФР05', 
            ' ',
            '#0080ff',
            ReactDOMServer.renderToString(<HtmlToolTip 
              toolTipData={dataTimeLine[i]}
              toolTipType={"start"}
              />)  ,	            
            new Date(moment( dataTimeLine[i].STARTUP_TIME ).subtract(1, 'hours')),
            new Date(dataTimeLine[i].STARTUP_TIME)
          ],
          [
            'ФР05',  
            ' ', 
            dataTimeLine[i].pause  === '00:00:00' ? '#708090' :'#d9e6f2',
            dataTimeLine[i].pause === '00:00:00' ?   ReactDOMServer.renderToString(
            <HtmlToolTip 
              toolTipData={dataTimeLine[i+1]}
              toolTipType={"lost"}
            />) :   ReactDOMServer.renderToString(
              <HtmlToolTip 
                toolTipData={dataTimeLine[i+1]}
                toolTipType={"pause"}
              />),
            new Date(moment( dataTimeLine[i].end_time ).add(1, 'hours')),	
            new Date(moment( dataTimeLine[i+1].STARTUP_TIME ).subtract(1, 'hours'))	
          ]
        );
      }
    else {
      rowsTimeLine.push(
        [
          'ФР05',
          dataTimeLine[i].PROGRAM_NUMBER.toString(),
          dataTimeLine[i].currentWork <= 300  ? '#50D050' :'#b0d1f2',
          ReactDOMServer.renderToString(
            <HtmlToolTip 
              toolTipData={dataTimeLine[i]}
              toolTipType={"fullfr"}
            />),
          new Date(dataTimeLine[i].STARTUP_TIME),
          new Date(dataTimeLine[i].end_time)
        ],
        [
          'ФР05',  
          dataTimeLine[i].PROGRAM_NUMBER.toString(),
          '#003366',
          ReactDOMServer.renderToString(<HtmlToolTip 
            toolTipData={dataTimeLine[i]}
            toolTipType={"stop"}
          />),
          new Date(dataTimeLine[i].end_time),
          new Date(moment( dataTimeLine[i].end_time ).add(1, 'hours')),
        ],  
        [
          'ФР05', 
          ' ',
          '#0080ff',
          ReactDOMServer.renderToString(<HtmlToolTip 
            toolTipData={dataTimeLine[i]}
            toolTipType={"start"}
            />)  ,	            
          new Date(moment( dataTimeLine[i].STARTUP_TIME ).subtract(1, 'hours')),
          new Date(dataTimeLine[i].STARTUP_TIME)
        ]
        );        
      }    
    }
  }
  return rowsTimeLine;      
}

export function handleResponseFR06 (response) {
  const rowsTimeLine=[], rowsTable=[];
  const dataTimeLine=response.data;
  const dataTable=response.data;
  const minValue=(Date.today().addMonths(-1));
  for (let i = 0; i < dataTimeLine.length; i += 1) {
      if (Date.compare(new Date(dataTimeLine[i].STARTUP_TIME),minValue)===1){
        if (i < dataTimeLine.length-1) {
          rowsTimeLine.push(
            [
              'ФР06',
              dataTimeLine[i].PROGRAM_NUMBER.toString(),
              dataTimeLine[i].currentWork <= 300  ? '#50D050' :'#b0d1f2',
              ReactDOMServer.renderToString(
                  <HtmlToolTip 
                    toolTipData={dataTimeLine[i]}
                    toolTipType={"fullfr"}
                  />),
              new Date(dataTimeLine[i].STARTUP_TIME),
              new Date(dataTimeLine[i].end_time)
            ],

            [
              'ФР06',  
              dataTimeLine[i].PROGRAM_NUMBER.toString(),
              '#003366',
              ReactDOMServer.renderToString(<HtmlToolTip 
                  toolTipData={dataTimeLine[i]}
                  toolTipType={"stop"}
                />),
              new Date(dataTimeLine[i].end_time),
              new Date(moment( dataTimeLine[i].end_time ).add(1, 'hours')),
            ],  
            [
              'ФР06', 
              ' ',
              '#0080ff',
              ReactDOMServer.renderToString(<HtmlToolTip 
                toolTipData={dataTimeLine[i]}
                toolTipType={"start"}
                />),	            
              new Date(moment( dataTimeLine[i].STARTUP_TIME ).subtract(1, 'hours')),
              new Date(dataTimeLine[i].STARTUP_TIME)
            ],
            [
              'ФР06',  
              ' ',
              dataTimeLine[i].pause  === '00:00:00' ? '#708090' :'#d9e6f2',
              dataTimeLine[i].pause === '00:00:00' ?   ReactDOMServer.renderToString(
              <HtmlToolTip 
                toolTipData={dataTimeLine[i+1]}
                toolTipType={"lost"}
              />) :   ReactDOMServer.renderToString(
                <HtmlToolTip 
                  toolTipData={dataTimeLine[i+1]}
                  toolTipType={"pause"}
                />),
              new Date(moment( dataTimeLine[i].end_time ).add(1, 'hours')),	
              new Date(moment( dataTimeLine[i+1].STARTUP_TIME ).subtract(1, 'hours'))	  
            ] 
          );
        }
        else {
          rowsTimeLine.push(
            [
              'ФР06',
              dataTimeLine[i].PROGRAM_NUMBER.toString(),
              dataTimeLine[i].currentWork <= 300  ? '#50D050' :'#b0d1f2',
              ReactDOMServer.renderToString(
                  <HtmlToolTip 
                    toolTipData={dataTimeLine[i]}
                    toolTipType={"fullfr"}
                  />),
              new Date(dataTimeLine[i].STARTUP_TIME),
              new Date(dataTimeLine[i].end_time)
            ],
            [
              'ФР06',  
              dataTimeLine[i].PROGRAM_NUMBER.toString(),
              '#003366',
              ReactDOMServer.renderToString(<HtmlToolTip 
                  toolTipData={dataTimeLine[i]}
                  toolTipType={"stop"}
                />),
              new Date(dataTimeLine[i].end_time),
              new Date(moment( dataTimeLine[i].end_time ).add(1, 'hours')),
            ],  
            [
              'ФР06', 
              ' ',
              '#0080ff',
              ReactDOMServer.renderToString(<HtmlToolTip 
                toolTipData={dataTimeLine[i]}
                toolTipType={"start"}
                />),	            
              new Date(moment( dataTimeLine[i].STARTUP_TIME ).subtract(1, 'hours')),
              new Date(dataTimeLine[i].STARTUP_TIME)
            ]
          );
        }
      }
    }
    for (let i = 0; i < dataTable.length; i += 1) {         
      if (Date.compare(new Date(dataTable[i].STARTUP_TIME),minValue)===1){ 
        rowsTable.push(
          [
            new Date(dataTable[i].STARTUP_TIME),
            dataTable[i].PROGRAM_NUMBER,
            new Date(dataTable[i].end_time),
            dataTable[i].duration.toString()
          ]         
        );
      }
    }
  return rowsTimeLine;
}