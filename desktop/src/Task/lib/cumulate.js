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
  cumulativeFrequencies.open = tasks.overdue.length;
  cumulativeFrequencies.notYet = tasks.open.length + cumulativeFrequencies.open;
  cumulativeFrequencies.done = tasks.notYet.length + cumulativeFrequencies.notYet;
  return cumulativeFrequencies;
};

export default cumulate;
