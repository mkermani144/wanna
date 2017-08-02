/* eslint-env mocha, jest */

import taskReducer from '../task';
import { addTask as FABAddTask } from '../../FAB/actionCreators';
import { addTask as ideaAddTask } from '../../Idea/actionCreators';
import {
  doTask,
  editTask,
  deleteTask,
} from '../../Task/actionCreators';

const defaultState = [
  {
    task: 'A cool task',
    start: 0,
    end: 86400000,
    estimation: 5,
    repetition: '',
    done: false,
    id: 'a',
  },
  {
    task: 'Another cool task',
    start: 0,
    end: 86400000,
    estimation: 60,
    repetition: 3,
    done: false,
    id: 'b',
  },
  {
    task: 'Even another cool task',
    start: 0,
    end: 86400000,
    estimation: 120,
    repetition: '',
    done: true,
    id: 'c',
  },
];

const getExpectedState = (props = {}) => Object.assign([], defaultState, props);

it('should return some state if no state and action is provided', () => {
  const actual = taskReducer(undefined, {});
  const expected = [];
  expect(actual).toEqual(expected);
});
it('should add new task (via FAB)', () => {
  const action = FABAddTask({
    task: 'A nice task',
    start: 0,
    end: 86400000,
    estimation: 30,
    repetition: '',
    done: false,
    id: 'd',
  });
  const actual = taskReducer(defaultState, action);
  const expected = getExpectedState({
    [defaultState.length]: {
      task: 'A nice task',
      start: 0,
      end: 86400000,
      estimation: 30,
      repetition: '',
      done: false,
      id: 'd',
    },
  });
  expect(actual).toEqual(expected);
});
it('should add new task (via idea)', () => {
  const action = ideaAddTask({
    task: 'A nice task',
    start: 0,
    end: 86400000,
    estimation: 30,
    repetition: '',
    done: false,
    id: 'd',
  });
  const actual = taskReducer(defaultState, action);
  const expected = getExpectedState({
    [defaultState.length]: {
      task: 'A nice task',
      start: 0,
      end: 86400000,
      estimation: 30,
      repetition: '',
      done: false,
      id: 'd',
    },
  });
  expect(actual).toEqual(expected);
});
it('should do non-repeating task', () => {
  const action = doTask(0);
  const actual = taskReducer(defaultState, action);
  const expected = getExpectedState({
    0: {
      task: 'A cool task',
      start: 0,
      end: 86400000,
      estimation: 5,
      repetition: '',
      done: true,
      id: 'a',
    },
  });
  expect(actual).toEqual(expected);
});
it('should do repeating task', () => {
  const action = doTask(1);
  const actual = taskReducer(defaultState, action);
  const expected = getExpectedState({
    1: {
      task: 'Another cool task',
      start: 86400000 * 4,
      end: 86400000 * 5,
      estimation: 60,
      repetition: 3,
      done: false,
      id: 'b',
    },
  });
  expect(actual).toEqual(expected);
});
it('should edit task', () => {
  const action = editTask(1, { task: 'A nice task' });
  const actual = taskReducer(defaultState, action);
  const expected = getExpectedState({
    1: {
      task: 'A nice task',
      start: 0,
      end: 86400000,
      estimation: 60,
      repetition: 3,
      done: false,
      id: 'b',
    },
  });
  expect(actual).toEqual(expected);
});
it('should delete task', () => {
  const action = deleteTask(1);
  const actual = taskReducer(defaultState, action);
  const expected = getExpectedState({
    1: undefined,
  }).filter(state => state);
  expect(actual).toEqual(expected);
});
