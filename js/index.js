"use strict";
// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'first websocket node.js app';
// Port where we'll run the websocket server
var webSocketsServerPort = 1337;
// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');

var colorMeaning = {
    'red': 'Red is the color of fire and blood, so it is associated with energy, war, danger, strength, power, determination as well as passion, desire, and love.',
    'orange':'Orange combines the energy of red and the happiness of yellow.'

}

//connection mysql
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "local_web",
    password: "local_web",
    database: "local_database"
});

con.connect(function(err) {
    if (err) throw err;
    console.log('it is connected to db');
});

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
});

server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
    httpServer: server
});

// WebSocket server
var connection
wsServer.on('request', function(request) {
    connection = request.accept(null, request.origin);
    console.log((new Date()) + ' Connection accepted.');

    // Input from users here.
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log((new Date()) + ' Received new msg: ' + message.utf8Data);
            let answer = morecalls(message.utf8Data); // call for db process
        }
    });

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

function morecalls(param) {
    let sql = "SELECT meaning FROM color_meaning where color = '" + param + "'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        connection.sendUTF(JSON.stringify({ type:'color', data: result[0].meaning }));
    });
}
