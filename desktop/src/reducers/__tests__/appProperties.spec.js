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

const setup = ({ type, flag, isFullscreen, calendarSystem, firstDayOfWeek } = {}) => ({
  appProperties: {
    showNotYetTasks: true,
    fullscreen: false,
    calendarSystem: 'en-US',
    firstDayOfWeek: 1,
  },
  action: {
    type,
    flag,
    isFullscreen,
    calendarSystem,
    firstDayOfWeek,
  },
});

it('should return some state if no state and action is provided', () => {
  const actual = appPropertiesReducer(undefined, {});
  const expected = {};
  expect(actual).toEqual(expected);
});
it('should update `showNotYetTasks` property of state', () => {
  const action = toggleNotYet(false);
  const actual = appPropertiesReducer(defaultState, action);
  const expected = getExpectedState({ showNotYetTasks: false });
  expect(actual).toEqual(expected);
});
it('should update `fullscreen` property of state', () => {
  const action = toggleFullscreen(true);
  const actual = appPropertiesReducer(defaultState, action);
  const expected = getExpectedState({ fullscreen: true })
  expect(actual).toEqual(expected);
});
it('should update `calendarSystem` property of state', () => {
  const action = changeCalendarSystem('fa-IR');
  const actual = appPropertiesReducer(defaultState, action);
  const expected = getExpectedState({ calendarSystem: 'fa-IR' });
  expect(actual).toEqual(expected);
});
it('should update `firstDayOfWeek` property of state', () => {
  const action = changeFirstDayOfWeek(6);
  const actual = appPropertiesReducer(defaultState, action);
  const expected = getExpectedState({ firstDayOfWeek: 6 });
  expect(actual).toEqual(expected);
});
