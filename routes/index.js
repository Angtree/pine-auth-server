var express = require('express');
var router = express.Router();
var redis = require('redis');
var uuid = require('node-uuid');
//var client = redis.createClient();

/* GET home page. */
router.get('/', function(req, res) {
  console.log(uuid.v1());
  console.log(uuid.v1());
  console.log(uuid.v1());
  console.log(uuid.v1());
  console.log(uuid.v1());
  res.render('index', {title: 'Express'});
});

router.get('/accounts/register', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    'result':'pine',
    'message':''
  }));
});

router.get('/accounts/login', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    'result':'pine',
    'message':''
  }));
});

module.exports = router;
