

exports = module.exports = function () {
};

exports.getTime = function () {
  return new Date().getTime();
};

exports.getExpireTime = function (expireMilliseconds) {
  var now = new Date();
  now.setTime(now.getTime() + expireMilliseconds);
  return now;
};