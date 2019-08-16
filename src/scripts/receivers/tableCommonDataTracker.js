import moment from 'moment';

export function tableCommonDataTracker (kilntype, dataTableRow) {
  return [
    moment(dataTableRow.STARTUP_TIME).locale("ru").format("YYYY  Do MMMM, h:mm:ss"),
    dataTableRow.PROGRAM_NUMBER,
    dataTableRow.PROGRAM_NAME,
    moment(dataTableRow.end_time).locale("ru").format("YYYY  Do MMMM, h:mm:ss"),
    dataTableRow.duration,
    dataTableRow.waterQuant,
    dataTableRow.powerVAh,
    dataTableRow.powerkWh    
  ] 
}