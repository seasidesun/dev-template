'use strict';

// 标准库依赖
var fs      = require('fs'),
    path    = require('path');
// 第三方库依赖
var express = require('express'),
    logger  = require('morgan'),
    hbs     = require('hbs');
// 自身依赖
var router  = require('./router'),
	config  = require('./config');

var app     = express();

// log
app.use(logger('dev'));

// static file
app.use(express.static(path.join(__dirname, 'public'), {maxAge: 86400000}));

// vies engine
app.set('view engine', 'hbs');

// rouer
router(app);

var port = config.express.port;
var server = app.listen(port, function () {
  console.log('Listening at %s', port);
  console.log('Env: ' + app.get('env'));
});
