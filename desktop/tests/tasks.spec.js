const assert = require('assert');
const color = require('../app/components/tasks/color');

describe('tasks', () => {
  describe('color.js', () => {
    const testTimes = [1475171640134, 1475171640134 + 86400000, 1475171640134 + (86400000 / 2)]
    it('should return green color hsla', () => {
      assert(color.returnColor(...testTimes) === 'hsla(100, 100%, 75%, .3)');
    });
  });
});
