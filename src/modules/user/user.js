'use strict';

/**
 * User module
 *
 * @module user
 */

var async = require('async');
var bcrypt = require('bcrypt');

var connection = require(SOURCE_ROOT+'/modules/redisconnection/redisconnection').getConnection();
var Errors = require('./_error.js');

var SCHEMA = 'user:';
var COL_PASSWORD = 'password';

/**
 * @class User
 * @static
 */
var User = {};

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

  var hashedPassword = null;

  async.series([
    checkUserExists,
    hashing,
    insertDB
  ], function(err, results) {
    callback(err, results);
  });

  function checkUserExists(callback) {
    User.exists(username, function(err, result) {
      var error = null;
      if (result == true) error = new Errors.UserError('UserError: User exists.');
      callback(error);
    });
  }

  function hashing(callback) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        hashedPassword = hash;
        callback(null);
      });
    });
  }

  function insertDB(callback) {
    connection.HMSET(SCHEMA+username, COL_PASSWORD, hashedPassword, function(err, reply) {
      var error = null;
      if (err) error = new error.UserError('UserError: can not insert userdata to DB: ' + err);
      callback(error);
    });
  }
};


module.exports = User;