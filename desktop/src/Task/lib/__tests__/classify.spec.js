/* eslint-env  jest */

import classify from '../classify';

const now = Date.now();
const tasks = [
  {
    task: 'an overdue task',
    start: now - (2 * 86400000),
    end: now - 86400000,
    done: false,
  },
  {
    task: 'an open task with due tomorrow',
    start: now - 86400000,
    end: now + (2 * 86400000),
    done: false,
  },
  {
    task: 'an open task with due tomorrow',
    start: now - 86400000,
    end: now + (3 * 86400000),
    done: false,
  },
  {
    task: 'an open task with due today',
    start: now - 86400000,
    end: now + 86400000,
    done: false,
  },
  {
    task: 'a not-yet task',
    start: now + 86400000,
    end: now + (2 * 86400000),
    done: false,
  },
  {
    task: 'a done task',
    start: now - 86400000,
    end: now,
    done: true,
  },
];

it('should classify into groups', () => {
  const { overdue, open, notYet, done } = classify(tasks);
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
it('should set not-yet tasks color to red', () => {
  const { notYet } = classify(tasks);
  expect(notYet[0].color).toBe('hsl(180, 100%, 50%)');
});
it('should set done tasks color to red', () => {
  const { done } = classify(tasks);
  expect(done[0].color).toBe('#AB47BC');
});
it('should set today due (if any)', () => {
  const { open } = classify(tasks);
  expect(open[0].due).toBe('today');
});
it('should set tomorrow due (if any)', () => {
  const { open } = classify(tasks);
  expect(open[1].due).toBe('tomorrow');
});
