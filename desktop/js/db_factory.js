var parse = require('./js/parse');
var Datastore = require('nedb');
var db = new Datastore({
  filename: `${__dirname}/tasks.db`,
  autoload: true
});
db.insert(
  {planet: parse('hello @2')},
  (err) => {}
);
