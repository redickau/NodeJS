var http = require('http');
var https = require('https');
var express = require('express');
var fs = require('fs');

var app = express();
var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};
var count = 0;

function startServer() {
    app.all('*', function(request, response, next) {
	if (request.url != 'favicon.ico') {
	        count++;
	        response.send('You are visitor number ' + count + '!');
	    }
    });

    http.createServer(app).listen(8080);
    https.createServer(options, app).listen(8443);
}

exports.startServer = startServer;

/* add routing functionality and something to handle parameters */
