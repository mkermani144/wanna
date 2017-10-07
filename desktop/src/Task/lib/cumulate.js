const cumulate = (tasks) => {
  const cumulativeFrequencies = {
    overdue: 0,
    open: 0,
    notYet: 0,
    done: 0,
  };
  if (!tasks) {
    return cumulativeFrequencies;
  }
  cumulativeFrequencies.overdue = tasks.overdue.length;
  cumulativeFrequencies.open = tasks.open.length + cumulativeFrequencies.overdue;
  cumulativeFrequencies.notYet = tasks.notYet.length + cumulativeFrequencies.open;
  cumulativeFrequencies.done = tasks.done.length + cumulativeFrequencies.notYet;
  return cumulativeFrequencies;
};

export default cumulate;
