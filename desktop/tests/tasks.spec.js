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
        assert(color.returnColor(...testTimes) === 'hsl(60, 100%, 60%)');
      });
    });
  });
});
