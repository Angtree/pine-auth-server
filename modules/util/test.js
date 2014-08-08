var date = require('./date.js');

describe('modules/util/date.js', function () {
  describe('getExpireTime', function () {
    it('should equal getTime + expireTime', function () {
      var time = date.getTime();
      var expireTime = date.getExpireTime(1000);

      expireTime.should.be.at.least(time+999);
      expireTime.should.be.below(time+1001);
    });
  });
});