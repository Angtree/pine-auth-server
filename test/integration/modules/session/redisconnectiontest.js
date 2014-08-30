'use strict';
var should = require(PROJECT_ROOT+'node_modules/chai/chai.js').should();

var connection = require(SOURCE_ROOT+'/modules/session/redisconnection.js');

describe('INTEGRATION TEST: src/modules/session/redisconnection.js', function() {
  describe('#getConnection', function() {
    it('Redis connection should success.', function() {
      should.exist(connection.getConnection());
    });
  });
});