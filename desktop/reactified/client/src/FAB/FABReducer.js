const FABReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        ideas: [
          ...state.ideas,
          action.idea
        ],
      };
    case 'ADD_IDEA':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          action.task
        ],
      };
    default:
      return state;
  }
};
