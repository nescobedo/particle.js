////////////////////////////---//
// BEGIN CUSTOM JS SCRIPTS
////////////////////////////---//

$(document).ready(function () {
  $.ajax({
    url: 'sample_csv.csv',
    dataType: 'text',
  }).done(convertCsv);

  function convertCsv(data) {
    var result = [];
    const rows = data.split(/\r?\n/);
    const columns = rows[0].split(',');

    for (i = 1; i < rows.length; i++) {
      row = rows[i].split(',');

      let tempObj = {};
      for (x = 0; x < row.length; x++) {
        tempObj[columns[x]] = row[x];
      }
      result.push(tempObj);
    }
    console.log('result', result);
  }
});
