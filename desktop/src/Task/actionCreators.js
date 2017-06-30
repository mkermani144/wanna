import { ActionCreators as UndoActionCreators } from 'redux-undo';

const doTask = index => ({
  type: 'DO_TASK',
  index,
});
const editTask = (index, newTask) => ({
  type: 'EDIT_TASK',
  index,
  newTask,
});
const deleteTask = index => ({
  type: 'DELETE_TASK',
  index,
});
const { undo } = UndoActionCreators;

export { doTask, editTask, deleteTask, undo };
