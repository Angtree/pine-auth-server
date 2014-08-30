'use strict';
var should = require(PROJECT_ROOT+'node_modules/chai/chai.js').should();

var connection = require(SOURCE_ROOT+'/modules/session/redis-connection.js');

describe('INTEGRATION TEST: src/modules/session/redis-connection.js', function() {
  describe('#getConnection', function() {
    it('Redis connection should success.', function(done) {
      connection.getConnection(function(err, result) {
        should.not.exist(err);
        should.exist(result);
        done();
      });
    });
  });
});