const { ipcRenderer: ipc } = require('electron');
const parse = require('./app/shared/database/parse');
const crypto = require('crypto');
const Datastore = require('nedb');
const db = new Datastore({
  filename: `${__dirname}/tasks.db`,
  afterSerialization: (object) => {
    const cipher = crypto.createCipher('aes256', 'sample-key');
    return (cipher.update(object, 'utf8', 'hex') + cipher.final('hex'));
  },
  beforeDeserialization: (object) => {
    const decipher = crypto.createDecipher('aes256', 'sample-key');
    return (decipher.update(object, 'hex', 'utf8') + decipher.final('utf8'));
  },
  autoload: true,
});

/**
 * Get a query, parse it and add it to
 * database
 * @param  {string}   query task query
 * @param  {Function} cb  callback
 * @return {undefined}
 */
function insert(query, cb) {
  const taskObj = parse(query);
  db.insert(taskObj, (err) => {
    if (err) {
      ipc.send('insert-error', err);
    } else {
      cb();
    }
  });
}

/**
 * Find appropriate tasks based on type
 * @param  {string}   type Determines type of task
 *                         to be found
 * @param  {Function} cb   callback
 * @return {undefined}
 */
function find(type, cb) {
  const now = Date.now();
  switch (type) {
  case 'open':
    db.find({
      $and: [{ start: { $lt: now } },
            { end: { $gt: now } },
            { status: 0 },
          ],
    }, { text: 1, start: 1, end: 1, units: 1 },
        (err, tasks) => {
          if (err) {
            ipc.send('find-error', err);
          } else {
            const nowInner = (Date.now() + (86400000 - (Date.now() % 86400000))) +
              (new Date().getTimezoneOffset() * 60000);
            const sorted = Object.keys(tasks).sort((a, b) => {
              const totalA = tasks[a].end - tasks[a].start;
              const totalB = tasks[b].end - tasks[b].start;
              const partialA = nowInner - tasks[a].start;
              const partialB = nowInner - tasks[b].start;
              const ratioA = partialA / totalA;
              const ratioB = partialB / totalB;
              return ratioB - ratioA;
            });
            cb(sorted.map(key => tasks[key]));
          }
        });
    break;
  case 'overdue':
    db.find({
      $and: [{ end: { $lt: now } },
            { status: 0 },
          ],
    }, { text: 1, start: 1, end: 1 },
        (err, tasks) => {
          if (err) {
            ipc.send('find-error', err);
          } else {
            const nowInner = (Date.now() + (86400000 - (Date.now() % 86400000))) +
              (new Date().getTimezoneOffset() * 60000);
            const sorted = Object.keys(tasks).sort((a, b) => {
              const totalA = tasks[a].end - tasks[a].start;
              const totalB = tasks[b].end - tasks[b].start;
              const partialA = nowInner - tasks[a].start;
              const partialB = nowInner - tasks[b].start;
              const ratioA = partialA / totalA;
              const ratioB = partialB / totalB;
              return ratioB - ratioA;
            });
            cb(sorted.map(key => tasks[key]));
          }
        });
    break;
  default:
  }
}

/**
 * Mark a task as done in the database
 * @param  {number}   taskId task id
 * @param  {Function} cb     callback
 * @return {undefined}
 */
function markAsDone(taskId, cb) {
  db.update({
    _id: taskId,
  }, {
    status: 1,
  }, {}, (err) => {
    if (err) {
      ipc.send('update-error', err);
    } else {
      cb();
    }
  });
}

/**
 * Remove a task from database
 * @param  {number}   taskId task id
 * @param  {Function} cb     callback
 * @return {undefined}
 */
function remove(taskId, cb) {
  db.remove({
    _id: taskId,
  }, {}, (err) => {
    if (err) {
      ipc.send('remove-error', err);
    } else {
      cb();
    }
  });
}

/**
 * Edit a task in database
 * @param  {number}   taskId  task id
 * @param  {string}   newText new task text
 * @param  {Function} cb      callback
 * @return {undefined}
 */
function edit(taskId, newText, cb) {
  db.update({
    _id: taskId,
  }, {
    $set: {
      text: newText,
    },
  }, {}, (err) => {
    if (err) {
      ipc.send('update-error', err);
    } else {
      cb();
    }
  });
}

angular.module('MainApp')
  .factory('db', () => {
    const dbRet = {
      insert,
      find,
      markAsDone,
      remove,
      edit,
    };
    return dbRet;
  });
