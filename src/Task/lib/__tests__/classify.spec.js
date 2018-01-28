/* eslint-env jest */

import classify from '../classify';

const todayStart = (new Date()).setHours(0, 0, 0, 0);

const tasks = [
  {
    task: 'an overdue task',
    start: todayStart - (2 * 86400000),
    end: todayStart - (86400000 - 1),
    done: false,
  },
  {
    task: 'an open task with due tomorrow',
    start: todayStart - 86400000,
    end: todayStart + ((2 * 86400000) - 1),
    done: false,
  },
  {
    task: 'an open task with due tomorrow',
    start: todayStart - 86400000,
    end: todayStart + ((3 * 86400000) - 1),
    done: false,
  },
  {
    task: 'an open task with due today',
    start: todayStart - 86400000,
    end: todayStart + (86400000 - 1),
    done: false,
  },
  {
    task: 'a not-yet task',
    start: todayStart + 86400000,
    end: todayStart + ((2 * 86400000) - 1),
    done: false,
  },
  {
    task: 'a done task',
    start: todayStart - 86400000,
    end: todayStart - 1,
    done: true,
  },
];

it('should classify into groups', () => {
  const {
    overdue,
    open,
    notYet,
    done,
  } = classify(tasks);
  expect(overdue.length).toBe(1);
  expect(open.length).toBe(3);
  expect(notYet.length).toBe(1);
  expect(done.length).toBe(1);
});
it('should sort tasks properly', () => {
  const { open } = classify(tasks);
  expect(open[0].due).toBe('today');
});
it('should set overdue tasks color to red', () => {
  const { overdue } = classify(tasks);
  expect(overdue[0].color).toBe('hsl(0, 100%, 75%)');
});
it('should set overdue tasks signal to true', () => {
  const { overdue } = classify(tasks);
  expect(overdue[0].signal).toBe(true);
});
it('should set not-yet tasks color to red', () => {
  const { notYet } = classify(tasks);
  expect(notYet[0].color).toBe('hsl(180, 100%, 50%)');
});
it('should set not-yet tasks signal to false', () => {
  const { notYet } = classify(tasks);
  expect(notYet[0].signal).toBe(false);
});
it('should set done tasks color to red', () => {
  const { done } = classify(tasks);
  expect(done[0].color).toBe('#AB47BC');
});
it('should set done tasks signal to false', () => {
  const { done } = classify(tasks);
  expect(done[0].signal).toBe(false);
});
it('should set today due (if any)', () => {
  const { open } = classify(tasks);
  expect(open[0].due).toBe('today');
});
it('should set tomorrow due (if any)', () => {
  const { open } = classify(tasks);
  expect(open[1].due).toBe('tomorrow');
});
