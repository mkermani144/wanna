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
const setSignal = (remaining, total) => remaining / total < 0.25;
const classify = (tasks) => {
  const classifiedTasks = {
    overdue: [],
    open: [],
    notYet: [],
    done: [],
  };
  const now = Date.now();
  tasks.forEach((task, index) => {
    const { start } = task;
    let { end } = task;
    end += 999;
    if (task.done) {
      classifiedTasks.done.push({
        ...task,
        color: '#AB47BC',
        signal: false,
        index,
      });
    } else if (now < start) {
      const remaining = end - now;
      classifiedTasks.notYet.push({
        ...task,
        due: setDue(remaining),
        color: 'hsl(180, 100%, 50%)',
        signal: false,
        index,
      });
    } else if (now <= end) {
      const remaining = end - now;
      const total = end - start;
      classifiedTasks.open.push({
        ...task,
        due: setDue(remaining),
        color: setColor(remaining, total),
        signal: setSignal(remaining, total),
        index,
      });
    } else {
      classifiedTasks.overdue.push({
        ...task,
        color: 'hsl(0, 100%, 75%)',
        signal: true,
        index,
      });
    }
  });
  Object.keys(classifiedTasks).forEach(group =>
    classifiedTasks[group].sort((a, b) => {
      const aRatio = (now - a.start) / (a.end - a.start);
      const bRatio = (now - b.start) / (b.end - b.start);
      return bRatio - aRatio;
    }));
  return classifiedTasks;
};

export default classify;
