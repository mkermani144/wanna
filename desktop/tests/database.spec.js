const assert = require('assert');
const parse = require('../app/shared/database/parse');

describe('database', () => {
  describe('parse.js', () => {
    const testQuery = 'Learn something! @3+2w ! ~1h ev2w';
    it('should return task text', () => {
      assert(parse(testQuery).text === 'Learn something!');
    });
    it('should return starting point', () => {
      assert(parse(testQuery).start < Date.now() + (14 * 86400000) + 1000);
    });
    it('should return ending point', () => {
      assert(parse(testQuery).end < Date.now() + (17 * 86400000) + 1000);
    });
    it('should return importance', () => {
      assert(parse(testQuery).importance === 2);
    });
    it('should return status', () => {
      assert(parse(testQuery).status === 0);
    });
    it('should return units', () => {
      assert(parse(testQuery).units === 60);
    });
    it('should return period', () => {
      assert(parse(testQuery).period === 1209600000);
    });
  });
});
