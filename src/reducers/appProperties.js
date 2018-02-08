const appPropertiesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'TOGGLE_NOT_YET':
      return {
        ...state,
        showNotYetTasks: action.flag,
      };
    case 'TOGGLE_FULLSCREEN':
      return {
        ...state,
        fullscreen: action.isFullscreen,
      };
    case 'CHANGE_CALENDAR_SYSTEM':
      return {
        ...state,
        calendarSystem: action.calendarSystem,
      };
    case 'CHANGE_FIRST_DAY_OF_WEEK':
      return {
        ...state,
        firstDayOfWeek: action.firstDayOfWeek,
      };
    case 'CHANGE_STARTUP_TAB':
      return {
        ...state,
        startupTab: action.startupTab,
      };
    default:
      return state;
  }
};


export default appPropertiesReducer;
