import undoable, { includeAction } from 'redux-undo';

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
        {
          ...state[action.index],
          idea: action.newIdea.idea,
        },
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

export default undoable(ideaReducer, {
  limit: 1,
  filter: includeAction('DELETE_IDEA'),
});
