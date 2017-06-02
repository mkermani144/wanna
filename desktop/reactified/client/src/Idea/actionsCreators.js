const convertIdea = (ideaId, tasks) => ({
  type: 'CONVERT_IDEA',
  ideaId,
  tasks,
});
const editIdea = (ideaId, newIdea) => ({
  type: 'EDIT_IDEA',
  ideaId,
  newIdea,
});
const deleteIdea = ideaId => ({
  type: 'DELETE_IDEA',
  ideaId,
});

export { convertIdea, editIdea, deleteIdea };
