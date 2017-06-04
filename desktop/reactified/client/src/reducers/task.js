const taskReducer = (state=[], action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        action.task
      ];
    case 'DO_TASK':
      return [
        ...state.slice(0, action.index),
        {
          ...state[action.index],
          done: true,
        },
        ...state.slice(action.index + 1),
      ];
    case 'EDIT_TASK':
      return [
        ...state.slice(0, action.index),
        action.newTask,
        ...state.slice(action.index + 1),
      ];
    case 'DELETE_TASK':
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1),
      ];
    default:
      return state;
  }
};

export default taskReducer;
