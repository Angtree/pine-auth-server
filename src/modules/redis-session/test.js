var session = require('./session.js');

describe('modules/redis-session/session.js', function () {
  describe('generate session', function () {
    it('should succeed.', function (done) {
      var username = 'reaperes';
      session.asyncGenerate(username, function(err, reply) {
        expect(reply).not.equal(0);
        done();
      });
    });
  });
});