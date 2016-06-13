var express = require('express');
var cors = require('cors');
var path = require('path');
var webpack = require('webpack');
var app = express();
var static_path = path.join(__dirname, 'public');

app.use(express.static(static_path));
app.use(cors());

app.all('/*', function (req, res) {
  res.sendFile('/index.html', {
    root: static_path
  });
}).listen(process.env.PORT || 8080, function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:8080');
});