'use strict';
var should = require(PROJECT_ROOT+'node_modules/chai/chai.js').should();

var user = require(SOURCE_ROOT+'/modules/user/user');

describe('INTEGRATION TEST: src/modules/user/user', function() {
  describe('#createUser', function() {
    it('Simple test should success.', function(done) {
      user.createUser('+821032080403', 'abcd1234', function(err, result){
        done();
      });
    });
//    it('Invalid arguments throws error', function() {
//      (function(){session.createSession();}).should.throw(Error);
//      (function(){session.createSession('only username');}).should.throw(Error);
//      (function(){session.createSession(function invalidFunc(){});}).should.throw(Error);
//    });
  });
});