'use strict';

module.exports = {
    // 程序运行的端口
    express: {
        port: process.env.PORT || 3000,
    },
    mongo: {
        url: 'mongodb://localhost/dev-template'
    }
}
