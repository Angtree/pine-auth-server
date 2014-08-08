var async = require("async");

var redis = require('../../modules/redis-connection/connection.js');
var session = require('../../modules/redis-session/session.js');

exports = module.exports = function (req, res) {
  var body = req.body;
  if (body.username === undefined || body.password === undefined) {
    res.status(200);
    res.send({
      result: 'not pine',
      message: 'Json request is malformed.'
    });
    return;
  }

  var username = body.username;
  var password = body.password;
  async.series([
    // find exists username
    function(callback) {
      redis.exists(username, function (err, reply) {
        if (err) {
          console.log('Redis err (EXISTS - exists user): ' + err);
          res.status(500);
          res.send({
            result: 'not pine',
            message: 'Redis err: ' + err.toString()
          });
        }
        else {
          callback(null);
        }
      });
    }
    // check password
    , function(callback) {
      redis.hget(username, 'password', function (err, reply) {
        if (err) {
          console.log('Redis err (hget - username password check) : ' + err);
          res.status(500);
          res.send({
            result: 'not pine',
            message: 'Redis err: ' + err.toString()
          });
        }
        else {
          if (password != reply) {
            res.status(200);
            res.send({
              result: 'not pine',
              message: 'Username or password is incorrect.'
            });
          }
          else {
            callback(null);
          }
        }
      });
    }
    // generate session key
    , function(callback) {
      session.asyncGenerate(username, function(err, sessionKey, expireTime) {
        if (err) {
          console.log('Redis err (Session.asyncGenerate : ' + err);
          res.status(500);
          res.send({
            result: 'not pine',
            message: 'Session err: ' + err.toString()
          });
        }
        else {
          var cookie = 'sessionid=' + sessionKey + '; expires=' + expireTime.toUTCString();
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cookie', cookie);
          callback(null);
        }
      });
    }
  ], function(err, sessionKey, expireTime) {
    res.end(JSON.stringify({
      'result':'pine',
      'message':''
    }));
  });
};