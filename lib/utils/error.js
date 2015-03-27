'use strict';

var util = require('util');

module.exports.dump = function (error)
{
    console.error('====================');
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
    console.error('====================');
};

// > var missingParameter = generate(400, 100102, 'Missing parameter:');
//
// > missingParameter(['phone', 'email']);
// { [Error: Missing parameter: phone email] status: 400, code: 100102 }
//
// > missingParameter('phone', 'email');
// { [Error: Missing parameter: phone email] status: 400, code: 100102 }
//
// > missingParameter(['phone', 'email'].join(', '));
// { [Error: Missing parameter: phone, email] status: 400, code: 100102 }
module.exports.generate = function (httpStatus, errorCode, message, isWarning)
{
    return function errorAPI()
    {
        var params = [message];
        var args = Array.prototype.slice.call(arguments);

        for (var i = 0; i < args.length; ++i)
        {
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
        error.isWarning = !!isWarning;
        return error;
    };
};
