var uuid = require('node-uuid');

var redis = require('../redis-connection/connection.js');
var date = require('../util/date.js');

var NAMESPACE = 'session:';
var EXPIRE_DATE = 'expire_date';
var USERNAME = 'username';
var EXPIRE_TIME = 60 * 60 * 6;

/**
 *  Redis table
 *
 *  key (session_key), expire_date, username
 */
exports = module.exports = function () {
};

exports.asyncGenerate = function (username, callback) {
  // if username is not defined it throws error
  if (username === 'undefined' || typeof username == 'function')
    throw new Error('Username parameter is not matched.');

  var sessionKey = uuid.v1().replace(/-/g, '') + uuid.v4().replace(/-/g, '');
  var expireTime = date.getExpireTime(EXPIRE_TIME);

  redis.hmset(NAMESPACE+sessionKey, EXPIRE_DATE, expireTime.toUTCString(), USERNAME, username, function (err, reply) {
    if (err)
      err = new Error('redis-session error: ' + err.toString());
    if (reply == 0) {
      err = new Error('redis-session: Cannot generate session key.');
      reply = '';
    }
    if (callback !== undefined) {
      if (reply == 'OK') {
        setTimeout(callback(err, sessionKey, expireTime), 0);
      }
      else {
        setTimeout(callback(new Error('Redis session create error: ' + reply)), 0);
      }
    }
  });
};
