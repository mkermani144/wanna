import appPropertiesReducer from '../appProperties';

const setup = (type, flag, isFullscreen, calendarSystem, firstDayOfWeek) => ({
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

it('should return input state if action type is not related', () => {
  const { appProperties, action} = setup('SOME_UNRELATED_ACTION_TYPE');
  const actual = appPropertiesReducer(appProperties, action);
  const expected = appProperties;
  expect(actual).toEqual(expected);
});
it('should update `showNotYetTasks` property of state', () => {
  const { appProperties, action} = setup('TOGGLE_NOT_YET', false);
  const actual = appPropertiesReducer(appProperties, action);
  const expected = { ...appProperties, showNotYetTasks: false };
  expect(actual).toEqual(expected);
});
it('should update `fullscreen` property of state', () => {
  const { appProperties, action} = setup('TOGGLE_FULLSCREEN', true, true);
  const actual = appPropertiesReducer(appProperties, action);
  const expected = { ...appProperties, fullscreen: true };
  expect(actual).toEqual(expected);
});
it('should update `calendarSystem` property of state', () => {
  const { appProperties, action} = setup('CHANGE_CALENDAR_SYSTEM', true, false, 'fa-IR');
  const actual = appPropertiesReducer(appProperties, action);
  const expected = { ...appProperties, calendarSystem: 'fa-IR' };
  expect(actual).toEqual(expected);
});
it('should update `firstDayOfWeek` property of state', () => {
  const { appProperties, action} = setup('CHANGE_FIRST_DAY_OF_WEEK', true, false, 'en-US', 7);
  const actual = appPropertiesReducer(appProperties, action);
  const expected = { ...appProperties, firstDayOfWeek: 7 };
  expect(actual).toEqual(expected);
});
