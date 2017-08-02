/* eslint-env mocha, jest */

import ideaReducer from '../idea';
import { addIdea } from '../../FAB/actionCreators';
import {
  editIdea,
  deleteIdea,
} from '../../Idea/actionCreators';

const defaultState = [
  {
    idea: 'A cool idea',
    id: 'a',
  },
  {
    idea: 'Another cool idea',
    id: 'b',
  },
  {
    idea: 'Even another cool idea',
    id: 'c',
  },
];

const getExpectedState = (props = {}) => Object.assign([], defaultState, props);

it('should return some state if no state and action is provided', () => {
  const actual = ideaReducer(undefined, {});
  const expected = [];
  expect(actual).toEqual(expected);
});
it('should add new idea', () => {
  const action = addIdea({
    idea: 'A nice idea',
    id: 'd',
  });
  const actual = ideaReducer(defaultState, action);
  const expected = getExpectedState({
    [defaultState.length]: {
      idea: 'A nice idea',
      id: 'd',
    },
  });
  expect(actual).toEqual(expected);
});
it('should edit idea', () => {
  const action = editIdea(1, { idea: 'A nice idea' });
  const actual = ideaReducer(defaultState, action);
  const expected = getExpectedState({
    1: {
      idea: 'A nice idea',
      id: 'b',
    },
  });
  expect(actual).toEqual(expected);
});
it('should delete idea', () => {
  const action = deleteIdea(1);
  const actual = ideaReducer(defaultState, action);
  const expected = getExpectedState({
    1: undefined,
  }).filter(state => state);
  expect(actual).toEqual(expected);
});
