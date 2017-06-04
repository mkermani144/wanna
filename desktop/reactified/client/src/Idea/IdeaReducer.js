const IdeaReducer = (state, action) => {
  switch (action.type) {
    case 'CONVERT_IDEA':
      return {
        ...state,
        ideas: [
          ...state.ideas.slice(0, action.index),
          ...state.ideas.slice(action.index + 1),
        ],
        tasks: [
          ...state.tasks,
          ...action.tasks,
        ],
      };
    case 'EDIT_IDEA':
      return {
        ...state,
        ideas: [
          ...state.ideas.slice(0, action.index),
          newIdea,
          ...state.ideas.slice(action.index + 1),
        ],
      };
    case 'DELETE_IDEA':
      return {
        ...state,
        ideas: [
          ...state.ideas.slice(0, action.index),
          ...state.ideas.slice(action.index + 1),
        ]
      };
    default:
      return state;
  }
};
