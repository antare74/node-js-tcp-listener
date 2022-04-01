require('./log');
const http = require('http');
const hostname = process.env.HOSTNAME || '0.0.0.0';
const wsPort = process.env.WS_PORT || 9898;
const WebSocketServer = require('websocket').server;
const net = require('net');
const server = http.createServer();
server.listen(wsPort, hostname, () => {
    console.log(`WS server running at http://${hostname}:${wsPort}/`);
});

const wsServer = new WebSocketServer({
    httpServer: server
});


wsServer.on('request', function(request) {
    console.log('cliemt connected' + request.origin);
    const connection = request.accept(null, request.origin);
    connection.on('message', function(message) {
      console.log('Pesan diterima:' + message.utf8Data);
      connection.sendUTF('Hi this is WebSocket server!');
    });
    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.');
    });
});
// net.createServer(function (sock) {
//     console.log(sock)
//     sock.setEncoding('utf8');

//     var body = "";
//     sock.on('data', function (data) {
//         body = body + data;
//     });

//     sock.on('end', function() {
//         console.log(data);
//         postData(data);
//     });
//     console.log('connection from ' + sock.remoteAddress + ':' + sock.remotePort);
//     // TODO error handling here
// });