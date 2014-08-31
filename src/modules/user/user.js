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

/**
 * If exists user, it returns 1.
 *
 * @param username {String}
 * @param callback {Function}
 */
User.exists = function(username, callback) {
  if (arguments.length !== 2 || (typeof username !== 'string') || !(callback instanceof Function))
    throw new Error('Arguments does not match.');

  connection.exists(SCHEMA + username, function(err, result) {
    if (result == 1) return callback(err, true);
    callback(err, false);
  });
};


module.exports = User;