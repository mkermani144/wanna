const appPropertiesReducer = (state={}, action) => {
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
    default:
      return state;
  }
};


export default appPropertiesReducer;
