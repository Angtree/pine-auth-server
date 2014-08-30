module.exports.RedisConnectionError = function(message) {
  this.name = 'RedisConnectionError';
  this.message = (message || '');
};
module.exports.RedisConnectionError.prototype = new Error();
