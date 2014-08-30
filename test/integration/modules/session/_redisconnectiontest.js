'use strict';
var should = require(PROJECT_ROOT+'node_modules/chai/chai.js').should();

var redisconnection = require(SOURCE_ROOT+'/modules/session/_redisconnection');

describe('INTEGRATION TEST: src/modules/session/_redisconnection', function() {
  describe('#getConnection', function() {
    it('Redis connection should not null', function() {
      var connection = redisconnection.getConnection();
      should.exist(connection);
    });
  });
});