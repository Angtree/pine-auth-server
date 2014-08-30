'use strict';
var redis = require('redis');

var errors = require(SOURCE_ROOT+'/errors.js');


var client = redis.createClient(GLOBAL.db.port, GLOBAL.db.host);
var connected = false;
var errorCount = 0;

client.on('error', function(err) {
  connected = false;
  console.log('Redis connection ' + errorCount++ + ' error: ' + err);
  console.log('Trying to reconnect...');
  setTimeout(function() {
    if (errorCount > 10) throw new errors.RedisConnectionError('Error: Can not connect redis.');
    client = redis.createClient(GLOBAL.db.port, GLOBAL.db.host);
  }, 1000);
});
client.on('connect', function() {
  connected = true;
});


module.exports.getConnection = function() {
  if (connected)
    return client;
  return null;
};
