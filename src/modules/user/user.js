'use strict';

/**
 * User module
 *
 * @module user
 */

var async = require('async');

var connection = require(SOURCE_ROOT+'/modules/redisconnection/redisconnection').getConnection();
var error = require('./_error.js');

var SCHEMA = 'user:';
var COL_PASSWORD = 'password';

/**
 * @class User
 * @static
 */
var User = {};

/**
 * Create user. Insert username, password to database.
 *
 * @param username {String}
 * @param password {String}
 * @param callback {Function} callback(err, result)
 */
User.createUser = function(username, password, callback) {
  if (arguments.length !== 3 || (typeof username !== 'string') || (typeof password !== 'string')
      || !(callback instanceof Function))
    throw new Error('Arguments does not match.');

  async.series([
    insertDB
  ], function(err, results) {
    callback(err, results);
  });

  function insertDB(callback) {
    connection.HMSET(SCHEMA+username, COL_PASSWORD, password, function(err, reply) {
      var error = null;
      if (err) error = new error.UserError('UserError: can not insert userdata to DB: ' + err);
      callback(error);
    });
  }
};






///**
// * Create session. Callback returns string sessionKey.
// *
// * @method createSession
// * @param username {String}
// * @param callback {Function} callback function(err, result). result parameter is session id.
// * @example
// *   session.createSession('+821012345678', function(err, result) { ... });
// */
//session.createSession = function(username, callback) {
//  if (arguments.length !== 2 || username === 'undefined' || username == 'function')
//    throw new Error('Arguments does not match.');
//
//  var sessionid = generateSessionString();
//  var expireDate = getExpireDate(EXPIRE_SESSION_TIME);
//
//  async.series([
//      insertSessionKey,
//      setExpireKey
//    ],
//    function(err, results) {
//      callback(err, sessionid);
//    });
//
//  function insertSessionKey(callback) {
//    connection.hmset(SCHEMA + sessionid, COL_USERNAME, username, COL_EXPIRE_DATE, expireDate.toUTCString(),
//      function(err, result) {
//        if (err) err = new error.SessionError('SessionError: Can not create session: ' + err);
//        callback(err);
//      });
//  }
//
//  function setExpireKey(callback) {
//    connection.expire(SCHEMA + sessionid, EXPIRE_SESSION_TIME, function(err, result) {
//      if (err) err = new error.SessionError('SessionError: Can not create session: ' + err);
//      callback(err);
//    });
//  }
//};
//
///**
// * Get username from sessionKey
// *
// * @method getUsername
// * @param sessionid {String} session id
// * @param callback {Function} callback function
// * @return {String} username
// * @example
// *   session.getUsername('2a4c88d030601', function(err, result) { ... })
// */
//session.getUsername = function(sessionid, callback) {
//  if (arguments.length !== 2 || sessionid === 'undefined' || sessionid == 'function')
//    throw new Error('Arguments does not match.');
//
//  connection.hget(SCHEMA + sessionid, COL_USERNAME, function(err, result) {
//    if (err) err = new error.SessionError('SessionError: Can not get session: ' + err);
//    callback(err, result);
//  });
//};
//
///**
// * @private
// * @method generateSessionString
// */
//function generateSessionString() {
//  return uuid.v1().replace(/-/g, '') + uuid.v4().replace(/-/g, '');
//}
//
///**
// * @private
// * @method getExpireDate
// * @return date object set expireHours
// */
//function getExpireDate(expireSeconds) {
//  var now = new Date();
//  now.setTime(now.getTime() + expireSeconds);
//  return now;
//}

module.exports = User;