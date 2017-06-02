const doTask = taskId => ({
  type: 'CONVERT_IDEA',
  taskId,
});
const editTask = (taskId, newTask) => ({
  type: 'EDIT_IDEA',
  taskId,
  newTask
});
const deleteTask = taskId => ({
  type: 'DELETE_IDEA',
  taskId,
});

export { convertIdea, editIdea, deleteIdea };
