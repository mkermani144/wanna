/**
 * Return a color based on starting and
 * ending point and current time
 *
 * @param  {number} start    starting point
 * @param  {number} end      ending point
 * @param  {current} current current time
 * @return {string}          color
 */
function returnColor(start, end, current) {
  const currentRounded = (current + (86400000 - (current % 86400000))) +
    (new Date().getTimezoneOffset() * 60000);
  const total = (end - start) / 86400000;
  const part = (currentRounded - start) / 86400000;
  const ratio = part / total;
  return `hsl(${(1 - ratio) * 120}, 100%, 60%)`;
}

function returnColorO(end, current) {
  const currentRounded = (current + (86400000 - (current % 86400000))) +
    (new Date().getTimezoneOffset() * 60000);
  const diff = (currentRounded - end) / 86400000;
  return `hsl(0, 100%, ${60 / (diff + 1)}%)`;
}

module.exports = {
  returnColor,
  returnColorO,
};
