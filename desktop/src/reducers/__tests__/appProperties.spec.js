/* eslint-env mocha, jest */

import appPropertiesReducer from '../appProperties';

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

it('should return some state if no state is provided', () => {
  const actual = appPropertiesReducer(undefined, {});
  const expected = {};
  expect(actual).toEqual(expected);
});
it('should return input state if action type is not related', () => {
  const { appProperties, action } = setup({
    type: 'SOME_UNRELATED_ACTION_TYPE',
  });
  const actual = appPropertiesReducer(appProperties, action);
  const expected = appProperties;
  expect(actual).toEqual(expected);
});
it('should update `showNotYetTasks` property of state', () => {
  const { appProperties, action } = setup({
    type: 'TOGGLE_NOT_YET',
    flag: false,
  });
  const actual = appPropertiesReducer(appProperties, action);
  const expected = { ...appProperties, showNotYetTasks: false };
  expect(actual).toEqual(expected);
});
it('should update `fullscreen` property of state', () => {
  const { appProperties, action } = setup({
    type: 'TOGGLE_FULLSCREEN',
    isFullscreen: true,
  });
  const actual = appPropertiesReducer(appProperties, action);
  const expected = { ...appProperties, fullscreen: true };
  expect(actual).toEqual(expected);
});
it('should update `calendarSystem` property of state', () => {
  const { appProperties, action } = setup({
    type: 'CHANGE_CALENDAR_SYSTEM',
    calendarSystem: 'fa-IR',
  });
  const actual = appPropertiesReducer(appProperties, action);
  const expected = { ...appProperties, calendarSystem: 'fa-IR' };
  expect(actual).toEqual(expected);
});
it('should update `firstDayOfWeek` property of state', () => {
  const { appProperties, action } = setup({
    type: 'CHANGE_FIRST_DAY_OF_WEEK',
    firstDayOfWeek: 7,
  });
  const actual = appPropertiesReducer(appProperties, action);
  const expected = { ...appProperties, firstDayOfWeek: 7 };
  expect(actual).toEqual(expected);
});
