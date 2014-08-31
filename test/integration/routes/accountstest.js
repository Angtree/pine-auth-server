'use strict';
var should = require(PROJECT_ROOT+'node_modules/chai/chai.js').should();
var session = require(SOURCE_ROOT+'/routes/accounts');

var http = require('http');

var gc = require(TEST_ROOT+'/util/redisgc');

describe('INTEGRATION TEST: src/routes/accounts', function() {
  describe('POST /accounts/register', function() {
    var options = null;

    beforeEach(function() {
      options = {
        hostname: 'localhost',
        port: 8300,
        path: '/accounts/register',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      };
    });

    it('Simple test should success.', function(done) {
      var request = http.request(options, function(res) {
        res.statusCode.should.be.equal(200);
        gc.deleteKey('+821012345678', function(err, result) {
          done();
        });
      });
      request.write(JSON.stringify({
        'username': '+821012345678',
        'password': 'abcd1234'
      }));
      request.end();
    });
    it('No username, password should return 400', function(done) {
      options.headers = {};
      http.request(options, function(res) {
        res.statusCode.should.be.equal(400);
        done();
      }).end();
    });
    it('No password should return 400', function(done) {
      var req = http.request(options, function(res) {
        res.statusCode.should.be.equal(400);
        done();
      });
      req.write(JSON.stringify({
        'username': '+821012345678'
      }));
      req.end();
    });
    it('No username should return 400', function(done) {
      var req = http.request(options, function(res) {
        res.statusCode.should.be.equal(400);
        done();
      });
      req.write(JSON.stringify({
        'password': 'abcd1234'
      }));
      req.end();
    });
  });
});