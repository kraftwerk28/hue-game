const http = require('http');
const app = require('express')();
const { resolve } = require('path');

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname + '/../dist/index.html'));
});

app.get(/\/(game.js|style.css)/, (req, res) => {
  res.sendFile(resolve(__dirname + '/../dist/' + req.params[0]));
});

app.get(/\/translations\/(.+)/, (req, res) => {
  res.sendFile(resolve(__dirname + '/../translations/' + req.params[0]));
});

app.get(/\/assets\/(.+)/, (req, res) => {
  res.sendFile(resolve(__dirname + '/../assets/' + req.params[0]));
});

app.listen(8084, () => { console.log('Listening on port 8084'); })
