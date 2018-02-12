require('env2')('.env');
var express = require('express');
var bodyParser = require('body-parser');
var allowCors = require('./config/cors');

var db = require('./config/db');

var app = express();

global.__root = __dirname + '/';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCors);

app.get('/v1', function(req, res) {
  res.status(200).send('API works.');
});

var UserController = require(__root + 'user/UserController');
app.use('/v1/users', UserController);

var AuthController = require(__root + 'auth/AuthController');
app.use('/v1/auth', AuthController);

module.exports = app;
