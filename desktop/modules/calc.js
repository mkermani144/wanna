// Function to parse user query and return an object of parsed elements
function parse(query) {
    query = query.trim() // Remove whitespaces from beginning and end of query
    var regex = /@(\d)$/
    var regexret = regex.exec(query)
    if (!regexret)
        return Error
    var diff = regexret[1]
    var text = query.slice(0, regexret.index)
    var start = Date.now()
    var end = start + 86400 * regexret[1]
    return {
        'text': text.trim(),
        'start': start,
        'end': end
    }
}
