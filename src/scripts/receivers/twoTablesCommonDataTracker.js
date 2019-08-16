function getTimeFromMins(x) { 
  var mins = Number(x);
  let hours = Math.trunc(mins/60); 
  let minutes = mins % 60; 
  return hours + 'ч. ' + minutes+'мин.';
}

export function TwoTablesCommonRow(kilntype, HeatOrGasParameter, dataTimeLineRow){

  return (HeatOrGasParameter=='HEAT')?
    [
    dataTimeLineRow.STEP_NO,     
    dataTimeLineRow.T_M_MODE,
    dataTimeLineRow.T_M_TEMP,
    getTimeFromMins(dataTimeLineRow.T_M_TIME_WIDTH)
    ]:[
      dataTimeLineRow.STEP_NO,     
      dataTimeLineRow.T_G_MODE,
      dataTimeLineRow.T_G_FLOW,
      dataTimeLineRow.T_G_OXYG,
      getTimeFromMins(dataTimeLineRow.T_G_TIME_WIDTH)
  ]
}