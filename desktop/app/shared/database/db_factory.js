const { ipcRenderer: ipc } = require('electron');
var parse = require('./app/shared/database/parse');
const crypto = require('crypto');
var Datastore = require('nedb');
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
function insert(query) {
  var taskObj = parse(query);
  db.insert(taskObj, (err) => {
    if (err) {
      ipc.send('insert-error', err);
    }
  });
}

/**
 * Find appropriate tasks based on type
 * @param  {string}   type Determines type of task
 *                         to be found
 * @param  {Function} cb   callback
 * @return {[type]}        List of all found tasks
 */
function find(type, cb) {
  var now = Date.now()
  switch (type) {
    case 'open':
      db.find({ $and: [{ start: { $lt: now } }, { end: { $gt: now } }] }, (err, docs) => {
        cb(docs);
      })
      break;
    default:
  }
}

angular.module('MainApp')
  .factory('db', () => {
    var db = {
      insert,
      find
    }
    return db;
  });
