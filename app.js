'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var debug = require('debug')('APP');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var config = require('./config');
var appRouters = require('./routes/app_router');

var app = express();

// view engine setup
var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {ifeq: function (a, b, block) { return a == b ? block.fn() : block.inverse(); }},
    defaultLayout: 'single',
    extname: '.hbs'
});
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')));

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

appRouters(app);

var server = app.listen(config.express.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  debug('Listening at http://%s:%s', host, port);
  debug('Env: ' + app.get('env'));
});
