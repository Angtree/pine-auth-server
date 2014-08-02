var express = require('express');
var router = express.Router();
var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');
var async = require("async");
var xregexp = require('xregexp').XRegExp;
var uuid = require('node-uuid');

// check validate json
router.use('/register', function(req, res, next) {
  var body = req.body;
  if (body.username === undefined || body.password === undefined) {
    res.status(400);
  }
  next();
});

// business logic
router.post('/register', function(req, res) {
  var body = req.body;

  async.series([
    // check user is exists
    function(callback) {
      client.exists(body.username, function (err, result) {
        if (err) {
          console.log('Redis err: ' + err);
          res.status(500);
          res.send({
            result: 'not pine',
            message: 'Redis err: ' + err.toString()
          });
        }

        if (result == 1) {
          res.status(200);
          res.send({
            result: 'not pine',
            message: 'Username duplicated.'
          });
        }
        else {
          res.status(200);
          res.send({
            result: 'pine'
          });
          callback(null);
        }
      });
    },
    // check validate username, password
    function(callback) {
      var regex = new xregexp('^[a-zA-Z][a-zA-Z0-9]{5,11}$');
      console.log(regex.test(body.username));
      callback(null);
  }], function(err, results) {
    console.log('end');
  });

//    // check username is validate, password is validate
//    function(callback) {
//      var regex = new xregexp('^[a-zA-Z][a-zA-Z0-9]{5,11}$');
//      console.log('sleepy');
//      console.log(regex.test(body.username));
//    }
//  ], function(err, results) {
//    if (err) {
//      console.log(err);
//      res.send({
//        'result': 'not pine',
//        'message': err.toString()
//      });
//    }
//    else {
//      res.send({
//        'result': 'pine',
//        'message': ''
//      })
//    }
//  });
});

router.get('/accounts/login', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    'result':'pine',
    'message':''
  }));
});

module.exports = router;
