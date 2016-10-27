/*
eslint max-len: ['error', 150, 2, ]
 */
/**
 * Parse task and return task info if
 * the task is valid, otherwise throw
 * error.
 * @param  {string} query  Entered task
 * @return {object}        Task info containing
 *                         task text, start time
 *                         and deadline
 */
function parse(query) {
  /**
   * Day, week or month coefficient
   * @type {Object}
   */
  const dwm = {
    d: 1,
    '': 1,
    w: 7,
    m: 30,
  };
  const regex = /@(\d*)([dwmDWM]?)(\+(\d+)([dwmDWM]?))?\s?(~([1-9]\d*)([hHmM]?))(\s?ev([1-9]\d*)([dwmDWM]?))?$/;
  const regexResult = regex.exec(query);
  if (!regexResult) {
    return undefined;
  }
  const text = query.slice(0, regexResult.index);
  let start = Date.now() - ((Date.now() % 86400000) - (new Date().getTimezoneOffset() * 60000));
  if (regexResult[3]) {
    start += 86400000 * regexResult[4] * dwm[regexResult[5]];
  }
  const end = start + (86400000 * (regexResult[1] || 1) * (dwm[regexResult[2]] || 1));
  const status = 0;
  let units;
  if (regexResult[8] === 'h') {
    units = regexResult[7] * 60;
  } else {
    units = regexResult[7];
  }
  let period;
  if (regexResult[9]) {
    period = 86400000 * regexResult[10] * dwm[regexResult[11]];
  } else {
    period = -1;
  }
  return {
    text: text.trim(),
    start,
    end,
    status,
    units,
    period,
  };
}

module.exports = parse;
