var async = require("async");
var xregexp = require('xregexp').XRegExp;

var redis = require('../../modules/redis-connection/connection.js');

exports = module.exports = function (req, res) {
  var body = req.body;
  if (body.username === undefined || body.password === undefined) {
    res.status(200);
    res.send({
      result: 'not pine',
      message: 'Json request is malformed.'
    });
  }

  async.series([
    // check user is exists
    function (callback) {
      redis.exists(body.username, function (err, result) {
        if (err) {
          console.log('Redis err (exists user): ' + err);
          res.status(500);
          res.send({
            result: 'not pine',
            message: 'Redis err: ' + err.toString()
          });
        }
        else {
          if (result == 1) {
            res.status(200);
            res.send({
              result: 'not pine',
              message: 'Username duplicated.'
            });
          }
          else
            callback(null);
        }
      });
    },

    // check validate username, password
    function (callback) {
      // http://stackoverflow.com/questions/2113908/what-regular-expression-will-match-valid-international-phone-numbers
      // http://en.wikipedia.org/wiki/Telephone_numbering_plan
      // http://en.wikipedia.org/wiki/Country_calling_code
      var phoneRegex = new xregexp('^\\+[0-9]{0,15}$');
      var passwordRegex = new xregexp('((?=.*\\d)(?=.*[a-z|A-Z]).{8,24})');  // password 8~24 length

      if (!phoneRegex.test(body.username) || !passwordRegex.test(body.password)) {
        res.status(200);
        res.send({
          result: 'not pine',
          message: 'Username or password is malformed.'
        });
      }
      else
        callback(null);
    },

    // register logic
    function (callback) {
      redis.HMSET(body.username, 'password', body.password, function (err, reply) {
        if (err) {
          console.log('Redis err (HMSET - register user): ' + err);
          res.status(500);
          res.send({
            result: 'not pine',
            message: 'Redis err: ' + err.toString()
          });
        }
        else {
          if (reply == 'OK') callback(null);
          else {
            res.status(500);
            res.send({
              result: 'not pine',
              message: 'Redis reply (HMSET - register user): ' + reply
            });
          }
        }
      });
    }
  ], function (err, results) {
    console.log(body.username + ' user is registered.');
    res.status(200);
    res.send({
      result: 'pine'
    });
  });
};