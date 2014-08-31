'use strict';
var async = require("async");
var xregexp = require('xregexp').XRegExp;

var router = require('express').Router();

var user = require(SOURCE_ROOT + '/modules/user/user');
var Errors = require('./_error');

//router.get('/login', loginController);
router.post('/register', registerController);











/**
 *  Register user api
 *
 *  Request:
 *
 *    method
 *        POST
 *    url
 *        /accounts/register
 *    body
 *        Content-type: application/json
 *        {
 *          "username": (String, international phone number, ex. +821012345678),
 *          "password": (String, password must have one of english and one of number, 8<= password <= 24)
 *        }
 *
 *  Response:
 *
 *    body
 *        Content-type: application/json
 *        {
 *          "result":     (String, success or fail),
 *          "message":    (error message)
 *        }
 *
 * @method registerController
 */
function registerController(req, res) {
  var body = req.body;
  var username = null;
  var password = null;

  async.series([
    checkRequestJsonKeyValidation,
    checkIfUserExists,
    createUser
  ], function(err, results) {
    if (err) {
      return res.status(400).type('application/json').json({
        result: 'fail',
        message: err
      });
    }
    res.status(200).type('application/json').json({
      result: 'success',
      message: ''
    });
  });

  function checkRequestJsonKeyValidation(callback) {
    if (body.username === undefined || body.password === undefined)
      return callback(new Error('Request json does not match'));
    username = body.username;
    password = body.password;

    var phoneRegex = new xregexp('^\\+[0-9]{0,15}$');
    var passwordRegex = new xregexp('((?=.*\\d)(?=.*[a-z|A-Z]).{8,24})');
    if (!phoneRegex.test(username) || !passwordRegex.test(password))
      return callback(new Error('Username or password is malformed.'));
    callback(null);
  }

  function checkIfUserExists(callback) {
    user.exists(username, function(err, result) {
      if (err) return callback(new Errors.AccountError('AccountError: Cannot create user'));
      if (result == true) callback(new Errors.UserExistsError('UserExistsError: User exists'));
      callback(null);
    });
  }

  function createUser(callback) {
    user.createUser(username, password, function(err, result) {
      var error = null;
      if (err) error = new Errors.AccountError('AccountError: Cannot create user: ' + err);
      callback(error);
    });
  }
}


module.exports = router;