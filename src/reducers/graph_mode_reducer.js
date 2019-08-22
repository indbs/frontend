export const graph_mode_selection = (state=[], action) => {
  switch (action.type){
    case 'GRAPH_SHORT_MODE_SELECTED':
      return commonGraphMode(state, action);
    case 'GRAPH_AIR_HEATERS_MODE_SELECTED':
      return commonGraphMode(state, action);
    case 'GRAPH_ALL_MODE_SELECTED':
      return commonGraphMode(state, action);
    case 'GRAPH_CURRENTS_MODE_SELECTED':
      return commonGraphMode(state, action);
    default:
      return state;
  }
}

function commonGraphMode(state, action){
  return (state.filter(c =>c.kiln==action.kiln).length==0)?[
    ...state,
    {
      kiln:           action.kiln,
      graph_mode:     action.graph_mode
  }]:[
    ...state.map(row => {return(row.kiln==action.kiln)?{         
        kiln:         row.kiln,
        graph_mode:   action.graph_mode
      }:{
        kiln:         row.kiln,
        graph_mode:   row.graph_mode
      }})
  ]
}