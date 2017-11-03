import { ActionCreators as UndoActionCreators } from 'redux-undo';

const editIdea = (index, newIdea) => ({
  type: 'EDIT_IDEA',
  index,
  newIdea,
});
const deleteIdea = index => ({
  type: 'DELETE_IDEA',
  index,
});
const addTask = task => ({
  type: 'ADD_TASK',
  task,
});
const raiseFab = () => ({
  type: 'RAISE_FAB',
});
const lowerFab = () => ({
  type: 'LOWER_FAB',
});
const { undo } = UndoActionCreators;

export { editIdea, deleteIdea, addTask, raiseFab, lowerFab, undo };
