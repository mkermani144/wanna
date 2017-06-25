const addTask = task => ({
  type: 'ADD_TASK',
  task,
});
const addIdea = idea => ({
  type: 'ADD_IDEA',
  idea,
});

export { addTask, addIdea };
