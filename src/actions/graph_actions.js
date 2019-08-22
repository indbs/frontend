export const graph_short_mode_selected =        (kiln) => ({
  type:               'GRAPH_SHORT_MODE_SELECTED',
  kiln:               kiln,
  graph_mode:         'short'
})

export const graph_air_heaters_mode_selected =  (kiln) => ({
  type:               'GRAPH_AIR_HEATERS_MODE_SELECTED',
  kiln:               kiln,
  graph_mode:         'airHeaters'
})

export const graph_all_mode_selected =          (kiln) => ({
  type:               'GRAPH_ALL_MODE_SELECTED',
  kiln:               kiln,
  graph_mode:         'all'
})

export const graph_currents_mode_selected =     (kiln) => ({
  type:               'GRAPH_CURRENTS_MODE_SELECTED',
  kiln:               kiln,
  graph_mode:         'currents'
})