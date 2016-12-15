'use strict';

var errorHandler = require('./error_handler.js');
var pageRouter = require('../lib/page'),
    apiRouter  = require('../lib/api'),
    restfulApi = require('../lib/api/restful_api');

module.exports = function (app) {

    //ping
    app.get('/ping', function (req, res) { res.send('OK'); });

    //router
    app.use('/api', apiRouter);
    app.use('/', pageRouter);
    //register restfulApi
    restfulApi.register(app);

    // 404 handler
    app.use(errorHandler.handler404);

    // Error handler
    app.use(errorHandler.errorHandler);
}
