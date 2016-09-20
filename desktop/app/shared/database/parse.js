/**
 * Parse task and return task info if
 * the task is valid, otherwise throw
 * error.
 * @param  {string} query  Enetered task
 * @return {object}        Task info containing
 *                         task text, start time
 *                         and dealine
 */
function parse(query) {
  query = query;
  /**
   * Day, week or month coefficient
   * @type {Object}
   */
  var dwm = {
    d: 1,
    '': 1,
    w: 7,
    m: 30
  };
  var regex = /@(\d+)([dwmDWM]?)(\+(\d+)([dwmDWM]?))?\s?(!{0,2})$/;
  var regexResult = regex.exec(query);
  var text = query.slice(0, regexResult.index);
  var start = Date.now();
  if (regexResult[3]) {
    start += 86400000 * regexResult[4] * dwm[regexResult[5]];
  }
  var end = start + 86400000 * regexResult[1] * dwm[regexResult[2]];
  var importance = regexResult[6].length + 1;
  console.log(importance);
  return {
    text,
    start,
    end,
    importance
  };
}

module.exports = parse;
