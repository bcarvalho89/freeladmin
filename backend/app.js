require('env2')('.env');
var express = require('express');
var bodyParser = require('body-parser');
var allowCors = require('./config/cors');
var i18n = require('i18n');

var db = require('./config/db');

var app = express();

global.__root = __dirname + '/';

i18n.configure({
  locales: ['pt_BR', 'en_US'],
  defaultLocale: 'pt_BR',
  objectNotation: true,
  directory: __root + '/config/locales'
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCors);
app.use(i18n.init);

app.get('/v1', function(req, res) {
  res.status(200).send(res.__('MISC.SALUTE'));
});

var UserController = require(__root + 'user/UserController');
app.use('/v1/users', UserController);

var AuthController = require(__root + 'auth/AuthController');
app.use('/v1/auth', AuthController);

module.exports = app;
