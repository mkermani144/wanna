const SettingsReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_NOT_YET':
      return {
        showNotYetTasks: aciton.flag,
      };
    default:
      return state;
  }
};
