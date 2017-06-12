const setDue = (remaining) => {
  if (remaining <= 86400000) {
    return 'today';
  } else if (remaining <= 172800000) {
    return 'tomorrow';
  } else {
    return '';
  }
};
const setColor = (remaining, total) => {
  const ratio = remaining / total;
  return `hsl(${ratio * 180}, 100%, 50%)`;
};
const classify = (tasks) => {
  let classifiedTasks = {
    overdue: [],
    open: [],
    notYet: [],
    done: [],
  };
  tasks.forEach((task, index) => {
    const now = Date.now();
    const { start, end } = task;
    if (task.done) {
      classifiedTasks.done.push({
        ...task,
        color: 'white',
        index,
      });
    } else if (now < start) {
      classifiedTasks.notYet.push({
        ...task,
        color: 'hsl(180, 100%, 50%)',
        index,
      });
    } else if (now <= end) {
      const remaining = end - now;
      const total = end - start;
      classifiedTasks.open.push({
        ...task,
        due: setDue(remaining),
        color: setColor(remaining, total),
        index,
      });
    } else {
      classifiedTasks.overdue.push({
        ...task,
        color: 'hsl(0, 100%, 75%)',
        index,
      });
    }
  });
  return classifiedTasks;
};

export default classify;
