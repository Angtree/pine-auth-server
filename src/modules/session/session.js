/**
 * Session module
 *
 * @module session
 */


'use strict';
var uuid = require('node-uuid');
var async = require('async');

var connection = require('./_redisconnection').getConnection();
var error = require('./_error');


var EXPIRE_SESSION_TIME = 6 * 60 * 60;    // seconds

var SCHEMA = 'session:';
var COL_USERNAME = 'username';
var COL_EXPIRE_DATE = 'expire_date';


/**
 * @class session
 * @static
 */
var session = {};

/**
 * Create session. Callback returns string sessionKey.
 *
 * @method createSession
 * @param username {String}
 * @param callback {Function} callback function(err, result). result parameter is sessionKey.
 * @example
 *   session.createSession('+821012345678', function(err, result) { ... });
 */
session.createSession = function(username, callback) {
  if (arguments.length !== 2 || username === 'undefined' || username == 'function')
    throw new Error('Arguments does not match.');

  var sessionKey = SCHEMA + generateSessionString();
  var expireDate = getExpireDate(EXPIRE_SESSION_TIME);

  async.series([
    insertSessionKey,
    setExpireKey
  ],
  function(err, results) {
    if (err) throw err;
    callback();
  });

  function insertSessionKey(callback) {
    connection.hmset(sessionKey, {
      COL_USERNAME: username,
      COL_EXPIRE_DATE: expireDate.toUTCString()
    }, function(err, result) {
      if (err) err = new error.SessionError('SessionError: Can not create session: ' + err);
      callback(err);
    });
  }

  function setExpireKey(callback) {
    connection.expire(sessionKey, EXPIRE_SESSION_TIME, function(err, result) {
      if (err) err = new error.SessionError('SessionError: Can not create session: ' + err);
      callback(err);
    });
  }
};

/**
 * @private
 * @method generateSessionString
 */
function generateSessionString() {
  return uuid.v1().replace(/-/g, '') + uuid.v4().replace(/-/g, '');
}

/**
 * @private
 * @method getExpireDate
 * @return date object set expireHours
 */
function getExpireDate(expireSeconds) {
  var now = new Date();
  now.setTime(now.getTime() + expireSeconds);
  return now;
}

module.exports = session;