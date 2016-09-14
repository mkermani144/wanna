var parse = require('./js/parse');
const crypto = require('crypto');
var Datastore = require('nedb');
const { ipcRenderer: ipc } = require('electron');
var db = new Datastore({
  filename: `${__dirname}/tasks.db`,
  afterSerialization: (object) => {
    var cipher = crypto.createCipher('aes256', 'sample-key');
    return (cipher.update(object, 'utf8', 'hex') + cipher.final('hex'));
  },
  beforeDeserialization: (object) => {
    var decipher = crypto.createDecipher('aes256', 'sample-key');
    return (decipher.update(object, 'hex', 'utf8') + decipher.final('utf8'));
  },
  autoload: true
});

/**
 * Get a query, parse it and add it to
 * database
 * @param {string} query task query
 */
function addToDB(query) {
  var taskObj = parse(query);
  db.insert(taskObj, (err) => {
    if (err) {
      ipc.send('insert-error', err);
    }
  });
}

angular.module('MainApp')
  .factory('addToDB', () => {
    return addToDB;
  });
