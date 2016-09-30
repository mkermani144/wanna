const assert = require('assert');
const color = require('../app/components/tasks/color');

describe('tasks', () => {
  describe('color.js', () => {
    describe('returnColor', () => {
      const now = Date.now();
      const currentRounded = (now + (86400000 - (now % 86400000))) +
        (new Date().getTimezoneOffset() * 60000);
      const testTimes = [currentRounded - 86400000, currentRounded + 86400000, now];
      it('should return yellow color hsla', () => {
        assert(color.returnColor(...testTimes) === 'hsla(60, 100%, 75%, .3)');
      });
    });
    describe('returnColorO', () => {
      const now = Date.now();
      const currentRounded = (now + (86400000 - (now % 86400000))) +
        (new Date().getTimezoneOffset() * 60000);
      const testTimes = [currentRounded, currentRounded + (86400000 * 2)];
      it('should return dark red color hsla', () => {
        assert(color.returnColorO(...testTimes) === 'hsla(0, 100%, 37.5%, .3)');
      });
    });
  });
});
