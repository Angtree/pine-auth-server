'use strict';

/**
 * @class UserError
 * @constructor
 */
exports.UserError = function(message) {
  this.name = 'UserError';
  this.message = (message || '');
};
exports.UserError.prototype = new Error();


module.exports = exports;