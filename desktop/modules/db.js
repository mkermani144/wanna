var datastore = require('/usr/local/lib/node_modules/nedb')
var db = new datastore({
  filename:'ds',
  autoload: true
})

function add(obj) {
  db.insert(obj, (err, insObj) => undefined)
}

exports.add = add
