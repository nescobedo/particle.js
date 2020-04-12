$(document).ready(function () {
  $.ajax({
    url: 'sample_csv.csv',
    dataType: 'text',
  }).done(convertCsv);

  function convertCsv(data) {
    console.log('convertCsv(data)', data);
    var jsonObj = [];
    const rows = data.split(/\r?\n/);
    const columns = rows[0].split(',');

    for (i = 1; i < rows.length; i++) {
      row = rows[i].split(',');

      let obj = {};
      for (x = 0; x < row.length; x++) {
        obj[columns[x]] = row[x];
      }
      jsonObj.push(obj);
    }
    console.log('jsonObj', jsonObj);
  }
});
