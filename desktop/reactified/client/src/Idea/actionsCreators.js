const convertIdea = ideaId => ({
  type: 'CONVERT_IDEA',
  ideaId,
});
const editIdea = ideaId => ({
  type: 'EDIT_IDEA',
  ideaId,
});
const deleteIdea = ideaId => ({
  type: 'DELETE_IDEA',
  ideaId,
});

export { convertIdea, editIdea, deleteIdea };
