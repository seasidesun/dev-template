'use strict';

var errorHandler = require('./error_handler.js');
var pageRouter = require('../lib/page'),
    apiRouter  = require('../lib/api');

module.exports = function (app) {

    //ping
    app.get('/ping', function (req, res) { res.send('OK'); });

    //router
    app.use('/api', apiRouter);
    app.use('/', pageRouter);

    // 404 handler
    app.use(errorHandler.handler404);

    // Error handler
    app.use(errorHandler.errorHandler);
}
