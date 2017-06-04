const showNoyYetReducer = (state={}, action) => {
  switch (action.type) {
    case 'TOGGLE_NOT_YET':
      return {
        showNotYetTasks: action.flag,
      };
    default:
      return state;
  }
};

export default showNoyYetReducer;
