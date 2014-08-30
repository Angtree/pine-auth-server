'use strict';
var connection = require('./redisconnection').getConnection();

var expireTime = 6 * 60 * 60;

var SCHEMA = 'session:';
var COL_EXPIRE_DATE = 'expire_date';
var COL_USERNAME = 'username';

var session = {};

session.createSession = function(username, callback) {
  if (arguments.length !== 2 || username === 'undefined' || username == 'function')
    throw new Error('Arguments does not match.');
};

module.exports = session;