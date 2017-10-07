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
  const { overdue, open, notYet, done } = cumulate(tasks);
  expect(overdue).toBe(1);
  expect(open).toBe(4);
  expect(notYet).toBe(5);
  expect(done).toBe(6);
});
it('should set all cumulative frequencies to zero if input is null', () => {
  const { overdue, open, notYet, done } = cumulate(null);
  expect(overdue).toBe(0);
  expect(open).toBe(0);
  expect(notYet).toBe(0);
  expect(done).toBe(0);
});
it('should set all cumulative frequencies to zero if input is undefined', () => {
  const { overdue, open, notYet, done } = cumulate();
  expect(overdue).toBe(0);
  expect(open).toBe(0);
  expect(notYet).toBe(0);
  expect(done).toBe(0);
});
