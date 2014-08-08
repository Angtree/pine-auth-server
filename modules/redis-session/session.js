var uuid = require('node-uuid');

var redis = require('../redis-connection/connection.js');
var date = require('../util/date.js');

var NAMESPACE = 'session:';
var EXPIRE_TIME = 60 * 60 * 24;

/**
 *  Redis table
 *
 *  key (session_key), expire_date, username
 */
exports = module.exports = function () {

};

exports.generate = function (username, callback) {
  var sessionKey = uuid.v1().replace(/-/g, '') + uuid.v4().replace(/-/g, '');
  var expireTime = date.getExpireTime(EXPIRE_TIME);

  redis.hmset(NAMESPACE+sessionKey, expireTime.toUTCString(), username, function (err, reply) {
    if (err)
      err = new Error('redis-session error: ' + err.toString());
    if (reply == 0) {
      err = new Error('redis-session: Cannot generate session key.');
      reply = '';
    }
    if (callback !== undefined)
      setTimeout(callback(err, reply), 0);
    else
      return sessionKey;
  });
};
