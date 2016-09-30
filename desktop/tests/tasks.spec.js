const assert = require('assert');
const color = require('../app/components/tasks/color');

describe('tasks', () => {
  describe('color.js', () => {
    describe('returnColor', () => {
      const testTimes = [1475181000000, 1475353800000, 1475241362889];
      it('should return green color hsla', () => {
        assert(color.returnColor(...testTimes) === 'hsla(60, 100%, 75%, .3)');
      });
    });
    describe('returnColorO', () => {
      const testTimes = [1475181000000, 1475353800000, 1475353800001];
      it('should return green color hsla', () => {
        assert(color.returnColorO(...testTimes) === 'hsla(0, 100%, 37.5%, .3)');
      });
    });
  });
});
