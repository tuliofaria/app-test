
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('<p>Hello World!</p>');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});