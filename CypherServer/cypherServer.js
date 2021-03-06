var http = require('http');
var https = require('https');
var express = require('express');
var fs = require('fs');
var caesar_cypher = require('./caesar_cypher');
var caesar_decipher = require('./caesar_decipher');
var url = require('url');

var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};
var app = express();

exports.startServer = function startServer() {
    app.get('*', function (request, response, next) {
	
	var fullURL = request.protocol + "://" + request.get('host') + request.url;
	var parsedUrlObj = url.parse(fullURL);
	console.log(parsedUrlObj);

	if (request.url !== "/favicon.ico" && parsedUrlObj.port === "8080") {
	    var len = request.url.length;
	    var msg = request.url.slice(1, len);
	    
	    var cypher_msg = caesar_cypher.buildCypherString(msg);
	    var key = caesar_cypher.getKey();
	    
	    response.redirect('https://localhost:8443/' + cypher_msg + "?query=" + key);
	}

	if (request.url !== "/favicon.ico" && parsedUrlObj.port === "8443") {
	    var pathname = parsedUrlObj.pathname;
	    var query = parsedUrlObj.query;

	    var msg = pathname.slice(1, pathname.length);
	    var key = query.slice(6, query.length);

	    var decipher_msg = caesar_decipher.decipherMSG(msg, key);
	    console.log("\n" + decipher_msg + "\n");
	    response.send("Deciphered Message: " + decipher_msg);
	}
    });

    var httpServer = http.createServer(app).listen(8080);
    var httpsServer = https.createServer(options, app).listen(8443);
};
