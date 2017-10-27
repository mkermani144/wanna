/* eslint-env  jest */

import cumulate from '../cumulate';

const todayStart = (new Date()).setHours(0, 0, 0, 0);

const tasks = {
  overdue: [
    {
      task: 'an overdue task',
      start: new Date(todayStart - (2 * 86400000)),
      end: new Date(todayStart - (86400000 - 1)),
      done: false,
    },
  ],
  open: [
    {
      task: 'an open task with due tomorrow',
      start: new Date(todayStart - 86400000),
      end: new Date(todayStart + ((2 * 86400000) - 1)),
      done: false,
    },
    {
      task: 'an open task with due tomorrow',
      start: new Date(todayStart - 86400000),
      end: new Date(todayStart + ((3 * 86400000) - 1)),
      done: false,
    },
    {
      task: 'an open task with due today',
      start: new Date(todayStart - 86400000),
      end: new Date(todayStart + (86400000 - 1)),
      done: false,
    },
  ],
  notYet: [
    {
      task: 'a not-yet task',
      start: new Date(todayStart + 86400000),
      end: new Date(todayStart + ((2 * 86400000) - 1)),
      done: false,
    },
  ],
  done: [
    {
      task: 'a done task',
      start: new Date(todayStart - 86400000),
      end: new Date(todayStart - 1),
      done: true,
    },
  ],
};

it('should count cumulative frequencies of task groups', () => {
  const { open, notYet, done } = cumulate(tasks);
  expect(open).toBe(1);
  expect(notYet).toBe(4);
  expect(done).toBe(5);
});
it('should set all cumulative frequencies to zero if input is null', () => {
  const { open, notYet, done } = cumulate(null);
  expect(open).toBe(0);
  expect(notYet).toBe(0);
  expect(done).toBe(0);
});
it('should set all cumulative frequencies to zero if input is undefined', () => {
  const { open, notYet, done } = cumulate();
  expect(open).toBe(0);
  expect(notYet).toBe(0);
  expect(done).toBe(0);
});
