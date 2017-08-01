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
  const actual = appUIReducer(undefined, {});
  const expected = {};
  expect(actual).toEqual(expected);
});
it('should make `fabRaised` true (idea)', () => {
  const action = ideaRaiseFab();
  const actual = appUIReducer(defaultState, action);
  const expected = getExpectedState({ fabRaised: true });
  expect(actual).toEqual(expected);
});
it('should make `fabRaised` false (idea)', () => {
  const action = ideaLowerFab();
  const actual = appUIReducer(defaultState, action);
  const expected = getExpectedState({ fabRaised: false });
  expect(actual).toEqual(expected);
});
it('should make `fabRaised` true (task)', () => {
  const action = taskRaiseFab();
  const actual = appUIReducer(defaultState, action);
  const expected = getExpectedState({ fabRaised: true });
  expect(actual).toEqual(expected);
});
it('should make `fabRaised` false (task)', () => {
  const action = taskLowerFab();
  const actual = appUIReducer(defaultState, action);
  const expected = getExpectedState({ fabRaised: false });
  expect(actual).toEqual(expected);
});
it('should update `currentTab`', () => {
  const action = changeTab('ideas');
  const actual = appUIReducer(defaultState, action);
  const expected = getExpectedState({ currentTab: 'ideas' });
  expect(actual).toEqual(expected);
});
