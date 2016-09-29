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
  const total = (end - start) / 86400000;
  const part = (current - start) / 86400000;
  const ratio = part / total;
  return `hsla(${(1 - ratio) * 200}, 100%, 75%, .3)`;
}

module.exports = returnColor;
