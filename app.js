require('./log');
const http = require('http');
const url = require('url');
const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = process.env.PORT || 3000;
// const WebSocket = require('ws')
// const ws = new WebSocket('ws://0.0.0.0:9898')


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('WS TESTING\n'); 
    req.url = url.parse(req.url, true);
    var query = JSON.stringify(req.url.query);
    console.log("message: " + query);
    // if (query !== JSON.stringify({})) {
    //     ws.send(query);
    // }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});