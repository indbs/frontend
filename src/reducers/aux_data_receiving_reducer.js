export const aux_data_received = (state=[], action) => {
  switch (action.type){
    case 'BURN_GRAPH_NUMBER_RECEIVED':
      return (state.filter(c =>c.kiln==action.kiln).length==0)?[
        //insert new element
        ...state,
        {
          kiln: action.kiln,
          number: action.number
        }
      ]:[
        //update existing element
        ...state.map(row => {return(row.kiln==action.kiln)?{         
            kiln: action.kiln,
            number: action.number
          }:{
            kiln: row.kiln,
            number: row.number
          }})
      ]
    case 'BURN_GRAPH_NUMBERS_CLEAN':
        return []
    default:
      return state
  }
}