function getTimeFromMins(x) { 
  var mins =    Number(x);
  let hours =   Math.trunc(mins/60); 
  let minutes = mins % 60; 
  return hours + 'ч. ' + minutes+'мин.';
}

/*
 TwoTables forms shows burn program selected by user on kiln and start up time.
 If user checked program and started the kiln two times there will be two preset of rows with different 'inserted' time.
*/

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