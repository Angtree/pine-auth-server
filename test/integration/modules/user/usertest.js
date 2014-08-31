'use strict';
var should = require(PROJECT_ROOT+'node_modules/chai/chai.js').should();
var user = require(SOURCE_ROOT+'/modules/user/user');

var gc = require(TEST_ROOT+'/util/redisgc');

describe('INTEGRATION TEST: src/modules/user/user', function() {
  describe('#createUser', function() {
    it('Simple test should success.', function(done) {
      user.createUser('+821012345678', 'abcd1234', function(err, result){
        if (err) throw err;
        done();
      });
    });
  });

  describe('#exists', function() {
    it('Check if exists, after create user', function(done) {
      var username = '+821012345678';
      user.exists(username, function(err, result) {
        if (err) throw err;
        result.should.be.false;
        user.createUser(username, 'abcd1234', function(err, result) {
          if (err) throw err;
          user.exists(username, function(err, result) {
            result.should.be.true;
            done();
          });
        });
      });
    });
  });

  afterEach(function(done) {
    gc.deleteKey('+821012345678', function(err, result) {
      done();
    });
  });
});