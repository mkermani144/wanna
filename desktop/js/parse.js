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
  query = query
  var regex = /@(\d+)$/
  var regexResult = regex.exec(query)
  var text = query.slice(0, regexResult.index)
  var start = Date.now()
  var end = start + 86400 * regexResult[1]
  return {
    text,
    start,
    end
  }
}

module.exports = parse;
