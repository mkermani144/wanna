import { addDays } from '../lib/date';

const taskReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        action.task,
      ];
    case 'DO_TASK':
      if (state[action.index].repetition) {
        const task = state[action.index];
        return [
          ...state.slice(0, action.index),
          {
            ...state[action.index],
            start: addDays(task.repetition, task.start),
            end: addDays(task.repetition, task.end),
          },
          ...state.slice(action.index + 1),
        ];
      }
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
        {
          ...state[action.index],
          task: action.newTask.task,
        },
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
