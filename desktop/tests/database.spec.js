const assert = require('assert');
const parse = require('../app/shared/database/parse');

describe('database', () => {
  describe('parse.js', () => {
    const testQuery = 'Learn something! @3+2w !';
    it('should return correct task text', () => {
      assert(parse(testQuery).text === 'Learn something!');
    });
    it('should return correct starting point', () => {
      assert(parse(testQuery).start < Date.now() + (14 * 86400000) + 1000);
    });
    it('should return correct ending point', () => {
      assert(parse(testQuery).end < Date.now() + (17 * 86400000) + 1000);
    });
    it('should return correct importance', () => {
      assert(parse(testQuery).importance === 2);
    });
    it('should return correct status', () => {
      assert(parse(testQuery).status === 0);
    });
  });
});
