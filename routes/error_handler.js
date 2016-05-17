'use strict';

var debug = require('debug')('ERROR');
var util = require('util');

// catch 404 and forward to error handler
function handler404(req, res, next) {
    var error = new Error('Not Found: "' + req.originalUrl + '"');
    error.status = 404;
    error.code = 404;

    next(error);
}

function errorHandler(error, req, res, next) {
    dump(error);
    // debug('%o', error);
    res.status(error.status || 500);
    res.json(error);
}

process.on('uncaughtException', function (error) {
    debug('uncaughtException ERROR');
    debug(new Date);
    dump(error);
});

function dump (error) {
    if (typeof error === 'object') {
        if (error.message) {
            console.error('%s: %s', error.name ? error.name : 'ERROR', error.message);
        }
        if (error.code) {
            console.error('code: ', error.code);
        }
        if (error.isWarning) {
            console.error('Warn: ', error.isWarning);
        }
        if (error.stack) {
            console.error('\nStacktrace:');
            console.error('------------------');
            console.error(error.stack);
            if (error.stack.indexOf('RangeError') !== -1) {
                process.exit(1);
            }
        }
    } else {
        console.error('dumpError :: argument is not an object');
    }
};

// > var missingParameter = generate(400, 100102, 'Missing parameter:');
//
// > missingParameter(['phone', 'email']); or
// > missingParameter('phone', 'email');
// { [Error: Missing parameter: phone email] status: 400, code: 100102 }
function generate (httpStatus, errorCode, message, isWarning) {
    return function errorAPI() {
        var params = [message];
        var args = Array.prototype.slice.call(arguments);

        for (var i = 0; i < args.length; ++i) {
            if (!util.isArray(args[i])) {
                params.push(args[i]);
            } else {
                params = params.concat(args[i]);
            }
        }

        var error = new Error(util.format.apply(util, params));
        error.stack = error.stack.split(/\n/g).splice(2).join('\n');
        error.status = httpStatus;
        error.code = errorCode;
        error.msg = message;
        if (isWarning) {
            error.isWarning = !!isWarning;
        }
        return error;
    };
};

module.exports.generate = generate;
module.exports.handler404 = handler404;
module.exports.errorHandler = errorHandler;
