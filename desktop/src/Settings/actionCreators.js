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

export { toggleNotYet, toggleFullscreen, changeCalendarSystem };
