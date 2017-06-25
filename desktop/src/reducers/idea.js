const ideaReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_IDEA':
      return [
        ...state,
        action.idea,
      ];
    case 'EDIT_IDEA':
      return [
        ...state.slice(0, action.index),
        action.newIdea,
        ...state.slice(action.index + 1),
      ];
    case 'DELETE_IDEA':
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1),
      ];
    default:
      return state;
  }
};

export default ideaReducer;
