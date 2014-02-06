var mysql = require("mysql");

var connection = mysql.createConnection({
  host     : '149.47.131.249',
  user     : 'piercere_free',
  password : '22pass22',
  database : 'piercere_sqltest'
});

connection.connect();

console.log(connection);

connection.end();
