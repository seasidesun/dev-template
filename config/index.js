'use strict';

var debug = require('debug')('CONFIG');

var nodeEnv = (function (){
    var env = process.env.NODE_ENV;

    if (!env) {
        env = process.env.NODE_ENV = 'development';
    } else if (!(env === 'development' || env === 'production' || env === 'testing')) {
        debug('Error: NODE_ENV must be "development" or "production" or "testing"');
        process.exit(1);
    }

    return env;
})();

var config = require('./config_current.js');
config.nodeEnv = nodeEnv;
debug('Server NODE_ENV: %s', nodeEnv);
// debug('Primary DB: %s', config.db.url);

module.exports = config;
