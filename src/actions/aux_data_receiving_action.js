export const last_burn_graph_number_received = (kiln, number) => ({
  type: 'BURN_GRAPH_NUMBER_RECEIVED',
  kiln: kiln,
  number: number
})

export const last_burn_graph_number_clean = () => ({
  type: 'BURN_GRAPH_NUMBERS_CLEAN'
})