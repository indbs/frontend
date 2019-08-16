export const graphOptionsRaisa={
  explorer: {
    actions: ['dragToZoom', 'rightClickToReset'],
    keepInBounds: true,maxZoomIn: 8.0
  },
  series:{
    0: {targetAxisIndex: 1},
    1: {targetAxisIndex: 1},
    2: {targetAxisIndex: 0},
    3: {targetAxisIndex: 0},
    4: {targetAxisIndex: 0},
    5: {targetAxisIndex: 0},
    6: {targetAxisIndex: 0},
    7: {targetAxisIndex: 0},
    8: {targetAxisIndex: 0},
    9: {targetAxisIndex: 0},
    10: {targetAxisIndex: 0},
    11: {targetAxisIndex: 0},
    12: {targetAxisIndex: 0},
    13: {targetAxisIndex: 0},
    14: {targetAxisIndex: 0},
  },
  hAxis: {
    title: 'Время каждые 5 минут',
    textStyle: {fontSize: 10}, 
    gridlines: {
      count: -1, 
      units: 
      {
        days: {
          format: ['MMM dd']
        },
        hours: {
          format: ['HH:mm', 'ha']
        },
      }
    },
    minorGridlines: {
      units: 
      {
        hours: {
          format: ['HH:mm', 'ha']
        },
        minutes: {
          format: ['HH:mm', ':mm']
        }
      }
    },
  },
  vAxes: {
    0: {
      title: 'Температура, °С', 
      gridlines: {color: '#dadada'}, 
      textStyle: {color: '#343434'}
    },
    1: {
      title: 'Азот, %', 
      gridlines: {color: '#cc9a9a'}, 
      textStyle: {color: '#cc9a9a'}
    }
  },
  legend: { 
      position: 'bottom', 
      textStyle: {color: 'blue', fontSize: 12}
    },
  chartArea:{
      left:100,
      top:50,
      width:'85%',
      height:'85%'},
  vAxis: {format: '####'}
}