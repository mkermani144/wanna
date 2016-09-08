var parse = require('./js/parse');
var Datastore = require('nedb');
var db = new Datastore({
  filename: `${__dirname}/tasks.db`,
  autoload: true
});

/**
 * Get a query, parse it and add it to
 * database
 * @param {string} query task query
 */
function addToDB(query) {
  console.log('Enter');
  try {
    var taskObj = parse(query);
    db.insert(taskObj, (err, data) => {
      if(err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

angular.module('MainApp')
  .factory('addToDB', () => {
    return addToDB;
  });
