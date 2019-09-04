// aux_data_receiver action. Loads the last burn numbers on loading GTML page after loggin

export const burn_graph_number_received = (kiln, graph_number) => ({
  type:               'BURN_GRAPH_NUMBER_RECEIVED',
  kiln:               kiln,
  number:             graph_number
})

export const burn_two_tables_number_received = (kiln, two_tables_number) => ({
  type:               'BURN_TWO_TABLES_NUMBER_RECEIVED',
  kiln:               kiln,
  two_tables_number:  two_tables_number
})

export const burn_graph_number_clean = () => ({
  type:               'BURN_GRAPH_NUMBERS_CLEAN'
})