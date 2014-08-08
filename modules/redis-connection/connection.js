var redis = require('redis');

exports = module.exports = redis.createClient(6379, '127.0.0.1');