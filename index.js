const http = require('http');
var url = require('url');
const hostname = '127.0.0.1';
const port = 3001;
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;
const WebSocket = require('ws')
const wss = new WebSocket('ws://localhost:9898')

// console.log = function(d) { //
//     log_file.write(util.format(d) + '\n');
//     log_stdout.write(util.format(d) + '\n');
// };

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Testing AWKOAWKOOKAWKO\n'); 
});

server.listen(port, hostname, (req, res) => {
    var urlParts = url.parse(req.url, true);
    var query = urlParts.query;

    wss.on('open', function open() {
        wss.send('something');
    });

    wss.on('data', (data) => {
        console.log(data.toString());
        client.end();
    });
    
    wss.on('end', () => {
        console.log('CLIENT: I disconnected from the server.');
    });
    console.log(`Server running at http://${hostname}:${port}/`);
});