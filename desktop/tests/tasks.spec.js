const assert = require('assert');
const color = require('../app/components/tasks/color');

describe('tasks', () => {
  describe('color.js', () => {
    const testTimes = [1475181000000, 1475181000000 + (2 * 86400000), 1475241362889];
    it('should return green color hsla', () => {
      assert(color.returnColor(...testTimes) === 'hsla(60, 100%, 75%, .3)');
    });
  });
});
