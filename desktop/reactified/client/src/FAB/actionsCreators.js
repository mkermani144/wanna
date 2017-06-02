const addTask = (state, task) => ({
  type: 'ADD_TASK',
  ...task
});
const addIdea = (state, idea) => ({
  type: 'ADD_IDEA',
  ...idea
});

export { addTask, addIdea };
