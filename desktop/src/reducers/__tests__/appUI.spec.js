/* eslint-env mocha, jest */

import appUIReducer from '../appUI';
import {
  raiseFab as ideaRaiseFab,
  lowerFab as ideaLowerFab,
} from '../../Idea/actionCreators';
import {
  raiseFab as taskRaiseFab,
  lowerFab as taskLowerFab,
} from '../../Task/actionCreators';
import changeTab from '../../Sidebar/actionCreators';

const defaultState = {
  fabRaised: false,
  currentTab: 'tasks',
};

const getExpectedState = (props = {}) => Object.assign({}, defaultState, props);

it('should return some state if no state and action is provided', () => {
  const expected = {};
  const actual = appUIReducer(undefined, {});
  expect(actual).toEqual(expected);
});
it('should make fabRaised true (idea)', () => {
  const expected = getExpectedState({ fabRaised: true });
  const action = ideaRaiseFab();
  const actual = appUIReducer(defaultState, action);
  expect(actual).toEqual(expected);
});
it('should make fabRaised false (idea)', () => {
  const expected = getExpectedState({ fabRaised: false });
  const action = ideaLowerFab();
  const actual = appUIReducer(defaultState, action);
  expect(actual).toEqual(expected);
});
it('should make fabRaised true (task)', () => {
  const expected = getExpectedState({ fabRaised: true });
  const action = taskRaiseFab();
  const actual = appUIReducer(defaultState, action);
  expect(actual).toEqual(expected);
});
it('should make fabRaised false (task)', () => {
  const expected = getExpectedState({ fabRaised: false });
  const action = taskLowerFab();
  const actual = appUIReducer(defaultState, action);
  expect(actual).toEqual(expected);
});
it('should update currentTab', () => {
  const expected = getExpectedState({ currentTab: 'ideas' });
  const action = changeTab('ideas');
  const actual = appUIReducer(defaultState, action);
  expect(actual).toEqual(expected);
});
