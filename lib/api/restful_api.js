'use strict';

var config   = require('../../config');

var restful  = require('node-restful'),
    mongoose = restful.mongoose;

var mongoUrl = 'mongodb://localhost/dev-template';
if (process.env.NODE_ENV == 'production')
    mongoUrl = config.mongo.url;

mongoose.connect(mongoUrl);

var ResourceCollName = restful.model('coll-name', mongoose.Schema({
        name: String,
        // createdAt: Date,
        // image: { url: String }
    }))
    .methods(['get', 'post', 'put', 'delete']);


function register (app) {
    ResourceCollName.register(app, '/api/coll-name');
}

module.exports.register = register;
module.exports.ResourceCollName = ResourceCollName;
