var express = require('express');
var cors = require('cors');
var path = require('path');
var webpack = require('webpack');
var app = express();
var isDevelopment = (process.env.NODE_ENV !== 'production');
var static_path = path.join(__dirname, 'public');
require('dotenv').config();
app.use(express.static(static_path));
app.use(cors());

var mongoose = require('mongoose');
mongoose.connect('mongodb://test:5345@ds019624.mlab.com:19624/heroku_k9hgz657');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var auth = require('./backend/auth.js')(app);
app.use('/', auth);

var task = require('./backend/task.js')(app);
app.use('/api/task', task);

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

if (isDevelopment) {
  var config = require('./webpack.config.js');
  var WebpackDevServer = require('webpack-dev-server');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api/*': 'http://localhost:8080/'
    },
  }).listen(3000, 'localhost', function (err, result) {
    if (err) { console.log(err); }
    console.log('Listening at localhost:3000');
  });
}

var http = require("http");
var moment = require('moment');
setInterval(function() {
    var hour=moment().hour();
    if(hour>=7 && hour <=23){
      http.get("http://snowerdries.herokuapp.com/");           
    }    
}, 300000); // every 5 minutes (300000)

