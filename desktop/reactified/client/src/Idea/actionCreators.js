const convertIdea = (index, tasks) => ({
  type: 'CONVERT_IDEA',
  index,
  tasks,
});
const editIdea = (index, newIdea) => ({
  type: 'EDIT_IDEA',
  index,
  newIdea,
});
const deleteIdea = index => ({
  type: 'DELETE_IDEA',
  index,
});

export { convertIdea, editIdea, deleteIdea };
