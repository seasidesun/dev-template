'use strict';

var errorHandler = require('./error_handler.js');

module.exports = function (app) {

    //ping
    app.get('/ping', function (req, res) { res.send('OK'); });

    //views
    app.get('/', function (req, res) { res.render('index', { title: 'Express' }); });

    //api
    // app.post('', controller);

    // 404 handler
    app.use(errorHandler.handler404);

    // Error handler
    app.use(errorHandler.errorHandler);
}
