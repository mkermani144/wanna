const toggleNotYet = flag => ({
  type: 'TOGGLE_NOT_YET',
  flag,
});
const toggleFullscreen = isFullscreen => ({
  type: 'TOGGLE_FULLSCREEN',
  isFullscreen,
});
const changeCalendarSystem = calendarSystem => ({
  type: 'CHANGE_CALENDAR_SYSTEM',
  calendarSystem,
});
const changeFirstDayOfWeek = firstDayOfWeek => ({
  type: 'CHANGE_FIRST_DAY_OF_WEEK',
  firstDayOfWeek,
});

export { toggleNotYet, toggleFullscreen, changeCalendarSystem, changeFirstDayOfWeek };
