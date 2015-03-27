'use strict';

var config = require('../config');
var http = require('http');
var fs = require('fs');

var errorLogStream = fs.createWriteStream(__dirname + '/..' + config.express.error_path, {flags: 'a'});

// catch 404 and forward to error handler
module.exports.handler404 = function (req, res, next)
{
    var error = new Error('Not Found: "' + req.originalUrl + '"');
    error.status = 404;
    error.code = 404;
    next(error);
};

module.exports.errorHandler = function (error, req, res, next)
{
    var meanError = getMeanError(error, req);
    console.log(meanError.stack);

    var meta = '[' + new Date() + '] ';
    if (req) {
    	meta += req.url;
    }
    meta += '\n';
    errorLogStream.write(meta + error.stack + '\n');

    if (!res) {
    	return;
    }
    res.status(meanError.status);
    res.json(meanError);
};
    
function getMeanError(error, req)
{
    var status = (function () {
        var tempStatus = error.status || 500;
        var parsed = parseInt(tempStatus, 10);
        if (isNaN(parsed) || !(600 > parsed && 200 <= parsed)) {
            return 500;
        } else {
            return parsed;
        }
    })(); // direct call

    var code = (function () {
        var tempCode = error.code || status;
        var parsed = parseInt(tempCode, 10);
        if (isNaN(parsed)) {
            return 500;
        } else {
            return parsed;
        }
    })(); // direct call

    var meanError = {
        status: status,
        statusDesc: http.STATUS_CODES[status],
        code: code,
        message: error.message,
        stack: error.stack || (new Error()).stack
    };

    return meanError;
};
    
process.on('uncaughtException', function (error)
{
	module.exports.errorHandler(error);
    console.error("uncaughtException ERROR");
});


