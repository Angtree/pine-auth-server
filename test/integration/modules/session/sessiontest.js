'use strict';
var should = require(PROJECT_ROOT+'node_modules/chai/chai.js').should();

var session = require(SOURCE_ROOT+'/modules/session/session');

describe('INTEGRATION TEST: src/modules/session/session', function() {
  describe('#createSession', function() {
    it('Simple test should success.', function() {
      session.createSession('namhoon', function(){});
    });

    it('Invalid arguments throws error', function() {
      (function(){session.createSession();}).should.throw(Error);
      (function(){session.createSession('only username');}).should.throw(Error);
      (function(){session.createSession(function invalidFunc(){});}).should.throw(Error);
    });
  });
});