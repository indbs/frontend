export function graphCommonRow(kilnLabel, dataGraphRow){
  return [
    (kilnLabel=='Раиса')?new Date(dataGraphRow.time):new Date(dataGraphRow.time1), 
    dataGraphRow.oxygen_predict_sp,
    dataGraphRow.analiser_calc,
    dataGraphRow.setpoint, 
    dataGraphRow.average,                           
    dataGraphRow.current_l1,
    dataGraphRow.current_l2,
    dataGraphRow.current_l3,
    dataGraphRow.tc410,
    dataGraphRow.tc411,
    dataGraphRow.tc412,
    dataGraphRow.flap_a_percent_position,
    dataGraphRow.flap_b_percent_position,
    dataGraphRow.flap_c_percent_position,
    dataGraphRow.flap_d_percent_position,
    dataGraphRow.flap_e_percent_position                         
  ]
}