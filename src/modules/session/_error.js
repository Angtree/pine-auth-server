'use strict';

/**
 * @class RedisConnectionError
 * @constructor
 */
exports.RedisConnectionError = function(message) {
  this.name = 'RedisConnectionError';
  this.message = (message || '');
};
exports.RedisConnectionError.prototype = new Error();

/**
 * @class SessionError
 * @constructor
 */
exports.SessionError = function(message) {
  this.name = 'SessionError';
  this.message = (message || '');
};
exports.SessionError.prototype = new Error();


module.exports = exports;