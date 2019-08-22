/*
state для отображения графика
[{
  kiln:                 Наименование печи 
  number:               Номер для отображения графика (добавляется при входе, обновляется при открытии gtml и при выборе в таймлайне).
}]

state для отображения двух таблиц
[{
  kiln:                 Наименование печи 
  number:               Номер для отображения графика (добавляется при входе, обновляется при открытии gtml и при выборе в таймлайне).
  two_tables_number:    Номер для отображения двух таблиц (добавляется только! при выборе данных в таблице).
}]
*/
export const aux_data_received = (state=[], action) => {
  switch (action.type){
    //insert graph program_number to display
    case 'BURN_GRAPH_NUMBER_RECEIVED':
      return (state.filter(c =>c.kiln==action.kiln).length==0)?[
        //insert new element
        ...state,
        {
          kiln:                     action.kiln,
          number:                   action.number
        }
      ]:[
        //update existing element (+ if two_tables_number already exists is don't modifying preset)
        ...state.map(row => {return(row.kiln==action.kiln)?{         
            kiln:                   row.kiln,
            number:                 action.number
          }:(row.two_tables_number)?{
            kiln:                   row.kiln,
            number:                 row.number,
            two_tables_number:      row.two_tables_number
          }:{
            kiln:                   row.kiln,
            number:                 row.number
          }
        })
      ]
    //insert two_tables program_number to display
    case 'BURN_TWO_TABLES_NUMBER_RECEIVED':
      return (state.filter(c =>c.kiln==action.kiln).length==0)?[
          //insert new element
          ...state,
          {
            kiln:                   action.kiln,
            two_tables_number:      action.two_tables_number
          }
        ]:[
          //update existing element
          ...state.map(row => {return(row.kiln==action.kiln)?{         
              kiln:                 row.kiln,
              number:               row.number,
              two_tables_number:    action.two_tables_number
            }:{
              kiln:                 row.kiln,
              number:               row.number,
              two_tables_number:    row.two_tables_number
            }})
        ]
    case 'BURN_GRAPH_NUMBERS_CLEAN':
      return []
    default:
      return state
  }
}