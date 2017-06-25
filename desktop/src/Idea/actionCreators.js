const editIdea = (index, newIdea) => ({
  type: 'EDIT_IDEA',
  index,
  newIdea,
});
const deleteIdea = index => ({
  type: 'DELETE_IDEA',
  index,
});
const addTask = (task) => ({
  type: 'ADD_TASK',
  task,
});

export { editIdea, deleteIdea, addTask };
