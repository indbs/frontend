





function selectOven (ovenName, ovenLastBorn) {
    return {
     
        type: "CHANGE_VALUES",
      windowTables: false,
      windowGraphic: true,
      selcted_oven: ovenName,
      selectedBorn: 7,
      lastBorn: ovenLastBorn
    }
  }
  export default selectOven;