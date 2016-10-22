const { ipcRenderer: ipc } = require('electron');
const parse = require('./app/shared/database/parse');
const crypto = require('crypto');
const Datastore = require('nedb');

const db = {};
db.tasks = new Datastore({
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
db.ideas = new Datastore({
  filename: `${__dirname}/ideas.db`,
  afterSerialization: (object) => {
    const cipher = crypto.createCipher('aes256', 'sample-key2');
    return (cipher.update(object, 'utf8', 'hex') + cipher.final('hex'));
  },
  beforeDeserialization: (object) => {
    const decipher = crypto.createDecipher('aes256', 'sample-key2');
    return (decipher.update(object, 'hex', 'utf8') + decipher.final('utf8'));
  },
  autoload: true,
});


/**
 * Get a query, parse it and add it to
 * database
 * @param  {string}   query task query
 * @param  {Function} cb    callback
 * @return {undefined}
 */
function insert(query, cb) {
  const taskObj = parse(query);
  db.tasks.insert(taskObj, (err) => {
    if (err) {
      ipc.send('insert-error', err);
    } else {
      cb();
    }
  });
}

/**
 * Get an idea and add it to database
 * @param  {string}   idea idea
 * @param  {Function} cb   callback
 * @return {undefined}
 */
function insertIdea(idea, cb) {
  db.ideas.insert({ idea }, (err) => {
    if (err) {
      ipc.send('insert-error', err);
      cb(err);
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
    db.tasks.find({
      $and: [{ start: { $lt: now } },
            { end: { $gt: now } },
            { status: 0 },
          ],
    }, { text: 1, start: 1, end: 1, units: 1 },
        (err, tasks) => {
          if (err) {
            ipc.send('find-error', err);
            cb(err);
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
    db.tasks.find({
      $and: [{ end: { $lt: now } },
            { status: 0 },
          ],
    }, { text: 1, start: 1, end: 1, units: 1 },
        (err, tasks) => {
          if (err) {
            ipc.send('find-error', err);
            cb(err);
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
 * Find ideas
 * @param  {Function} cb   callback
 * @return {undefined}
 */
function findIdeas(cb) {
  db.ideas.find({}, { idea: 1 }, (err, ideas) => {
    if (err) {
      ipc.send('find-error', err);
    } else {
      cb(Object.keys(ideas).map(key => ideas[key]));
    }
  });
}

/**
 * Mark a task as done in the database
 * @param  {number}   taskId task id
 * @param  {Function} cb     callback
 * @return {undefined}
 */
function markAsDone(taskId, cb) {
  db.tasks.find(
    { _id: taskId },
    { start: 1, end: 1, period: 1 },
    (err, tasks) => {
      if (err) {
        ipc.send('find-error', err);
        cb(err);
      } else {
        const { start, end, period } = tasks[0];
        if (period === -1) {
          db.tasks.update({
            _id: taskId,
          }, { $set: {
            status: 1,
          } }, {}, (errInner) => {
            if (errInner) {
              ipc.send('update-error', err);
            } else {
              cb();
            }
          });
        } else {
          db.tasks.update({
            _id: taskId,
          }, { $set: {
            start: start + period,
            end: end + period,
          } }, {}, (errInner) => {
            if (errInner) {
              ipc.send('update-error', err);
            } else {
              cb();
            }
          });
        }
      }
    }
  );
}

/**
 * Remove a task from database
 * @param  {number}   taskId task id
 * @param  {Function} cb     callback
 * @return {undefined}
 */
function remove(taskId, cb) {
  db.tasks.remove({
    _id: taskId,
  }, {}, (err) => {
    if (err) {
      ipc.send('remove-error', err);
      cb(err);
    } else {
      cb();
    }
  });
}

/**
 * Remove an idea from database
 * @param  {number}   ideaId idea id
 * @param  {Function} cb     callback
 * @return {undefined}
 */
function removeIdea(ideaId, cb) {
  db.ideas.remove({
    _id: ideaId,
  }, {}, (err) => {
    if (err) {
      ipc.send('remove-error', err);
      cb(err);
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
  db.tasks.update({
    _id: taskId,
  }, {
    $set: {
      text: newText,
    },
  }, {}, (err) => {
    if (err) {
      ipc.send('update-error', err);
      cb(err);
    } else {
      cb();
    }
  });
}

/**
 * Edit an idea in database
 * @param  {number}   ideaId  idea id
 * @param  {string}   newText new idea text
 * @param  {Function} cb      callback
 * @return {undefined}
 */
function editIdea(ideaId, newIdea, cb) {
  db.ideas.update({
    _id: ideaId,
  }, {
    $set: {
      idea: newIdea,
    },
  }, {}, (err) => {
    if (err) {
      ipc.send('update-error', err);
      cb(err);
    } else {
      cb();
    }
  });
}

angular.module('MainApp')
  .factory('db', () => {
    const ret = {
      insert,
      insertIdea,
      find,
      findIdeas,
      markAsDone,
      remove,
      removeIdea,
      edit,
      editIdea,
    };
    return ret;
  });
