'use strict';
var redis = require('redis');

var errors = require(SOURCE_ROOT+'/errors.js');


var client = null;
var connection = {};

connection.getConnection = function(callback) {
  if (client !== null)
    return setTimeout(callback(null, client), 0);

  client = redis.createClient(GLOBAL.db.port, GLOBAL.db.host);
  client.on('error', function(err) {
    callback(new errors.RedisConnectionError('Cannot connect redis: ' + err));
  });
  client.on('connect', function() {
    callback(null, client);
  });
};


exports = module.exports = connection;