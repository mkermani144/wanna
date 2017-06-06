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
  };
  tasks.map((task) => {
    const now = Date.now();
    const { start, end } = task;
    if (now < start) {
      classifiedTasks.notYet.push({
        ...task,
        color: 'hsl(180, 100%, 50%)',
      });
    } else if (now <= end) {
      const remaining = end - now;
      const total = end - start;
      classifiedTasks.open.push({
        ...task,
        due: setDue(remaining),
        color: setColor(remaining, total),
      });
    } else {
      classifiedTasks.overdue.push({
        ...task,
        color: 'hsl(0, 100%, 75%)',
      });
    }
  });
  return classifiedTasks;
};

export default classify;
