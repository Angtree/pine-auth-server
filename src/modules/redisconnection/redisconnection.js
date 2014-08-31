'use strict';
var redis = require('redis');

var redisconnection = {};

var client = redis.createClient(GLOBAL.db.port, GLOBAL.db.host);
var connected = true;
var errorCount = 0;

client.on('error', function (err) {
  connected = false;
  console.log('Redis connection ' + errorCount++ + ' error: ' + err);
  console.log('Trying to reconnect...');
  setTimeout(function () {
    if (errorCount > 10) throw new error.RedisConnectionError('Error: Can not connect redis.');
    client = redis.createClient(GLOBAL.db.port, GLOBAL.db.host);
  }, 1000);
});
client.on('connect', function () {
  console.log('Redis connected: ' + new Date());
  connected = true;
});

redisconnection.getConnection = function() {
  return client;
};

module.exports = redisconnection;