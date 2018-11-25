const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  let path = '';
  if (req.url.startsWith('/translations'))
    path = req.url;
  else
    path = '/dist' + (req.url === '/' ? '/index.html' : req.url);


  fs.readFile(__dirname + path, 'utf8', (err, data) => {
    console.log(path);
    res.statusCode = 200;
    res.end(data);
  });
}).listen(8084);
