var date = require('./date.js');

describe('modules/util/date.js', function () {
  describe('getExpireTime', function () {
    it('should equal getTime + expireTime', function () {
      var time = date.getTime();
      var expireTime = date.getExpireTime(1000);

      expect(expireTime).be.at.least(time+990);
      expect(expireTime).be.below(time+1010);
    });
  });
});