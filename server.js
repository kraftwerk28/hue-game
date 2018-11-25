const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  const path = '/dist' + (req.url === '/' ? '/index.html' : req.url);

  fs.readFile(__dirname + path, 'utf8', (err, data) => {
    res.statusCode = 200;
    res.end(data);
  });
}).listen(8084);
