require('./log');
const host = process.env.HOSTNAME || '0.0.0.0';
const port = process.env.WS_PORT || 6001;
const net = require('net');


const server = net.createServer();
server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port +'.');
});

let sockets = [];
let dateObj = new Date();
let second = dateObj.getSeconds();
let minute = dateObj.getMinutes();
let hour = dateObj.getHours();
let month = dateObj.getUTCMonth();
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();
let stdDate = '[' + year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + ']';

server.on('connection', function(sock) {
    let ipAddress = sock.remoteAddress;
    console.log(stdDate + ' ' + ipAddress + ' Connected');

    sockets.push(sock);

    sock.on('data', function(data) {
        console.log(stdDate + ' ' + ipAddress + ' Data: ' + data);
        // Write the data back to all the connected, the client will receive it as data from the server
        sockets.forEach(function(sock, index, array) {
            sock.write(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
        });
    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        let index = sockets.findIndex(function(o) {
            return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);
        console.log(stdDate + ' ' + ipAddress + ' Closed');
    });
});