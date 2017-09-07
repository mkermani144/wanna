const setDue = (remaining) => {
  if (remaining < 86400000) {
    return 'today';
  } else if (remaining < 172800000) {
    return 'tomorrow';
  }
  return '';
};
const setColor = (remaining, total) => {
  const ratio = remaining / total;
  return `hsl(${ratio * 180}, 100%, 50%)`;
};
const classify = (tasks) => {
  const classifiedTasks = {
    overdue: [],
    open: [],
    notYet: [],
    done: [],
  };
  const now = Date.now();
  tasks.forEach((task, index) => {
    let { start, end } = task;
    start = Date.parse(start);
    end = Date.parse(end) + 999;
    if (task.done) {
      classifiedTasks.done.push({
        ...task,
        color: '#AB47BC',
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
  Object.keys(classifiedTasks).forEach(group =>
    classifiedTasks[group].sort((a, b) => {
      const aRatio = (now - a.start) / (a.end - a.start);
      const bRatio = (now - b.start) / (b.end - b.start);
      return bRatio - aRatio;
    }),
  );
  return classifiedTasks;
};

export default classify;
