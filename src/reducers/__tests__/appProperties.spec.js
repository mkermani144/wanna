/* eslint-env mocha, jest */

import appPropertiesReducer from '../appProperties';
import {
  toggleNotYet,
  toggleFullscreen,
  changeCalendarSystem,
  changeFirstDayOfWeek,
} from '../../Settings/actionCreators';

const defaultState = {
  showNotYetTasks: true,
  fullscreen: false,
  calendarSystem: 'en-US',
  firstDayOfWeek: 1,
};

const getExpectedState = (props = {}) => Object.assign({}, defaultState, props);

it('should return some state if no state and action is provided', () => {
  const expected = {};
  const actual = appPropertiesReducer(undefined, {});
  expect(actual).toEqual(expected);
});
it('should update showNotYetTasks of state', () => {
  const expected = getExpectedState({ showNotYetTasks: false });
  const action = toggleNotYet(false);
  const actual = appPropertiesReducer(defaultState, action);
  expect(actual).toEqual(expected);
});
it('should update fullscreen of state', () => {
  const expected = getExpectedState({ fullscreen: true });
  const action = toggleFullscreen(true);
  const actual = appPropertiesReducer(defaultState, action);
  expect(actual).toEqual(expected);
});
it('should update calendarSystem of state', () => {
  const expected = getExpectedState({ calendarSystem: 'fa-IR' });
  const action = changeCalendarSystem('fa-IR');
  const actual = appPropertiesReducer(defaultState, action);
  expect(actual).toEqual(expected);
});
it('should update firstDayOfWeek of state', () => {
  const expected = getExpectedState({ firstDayOfWeek: 6 });
  const action = changeFirstDayOfWeek(6);
  const actual = appPropertiesReducer(defaultState, action);
  expect(actual).toEqual(expected);
});
