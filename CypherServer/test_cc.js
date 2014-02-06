var test_d = require('./caesar_decipher');
var test_c = require('./caesar_cypher');

var msg = test_c.buildCypherString("Does,%20it work with+spaces still?");
console.log(msg);
var key = test_c.getKey();

console.log(test_d.decipherMSG(msg, key));
