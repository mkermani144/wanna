/* eslint-env browser */

let fs;
let path;
let os;
if (process.env.REACT_APP_E2E) {
  fs = {
    readFileSync() {},
    writeFileSync() {},
  };
  path = { join() {} };
  os = { homedir() {} };
} else {
  fs = window.require('fs');
  path = window.require('path');
  os = window.require('os');
}

let parentPath = os.homedir();
if (process.env.NODE_ENV === 'development') {
  parentPath = './';
}

const dbPath = path.join(parentPath, '.wanna/db');

const fetchDatabaseState = () => {
  let data = fs.readFileSync(dbPath, 'utf-8');
  if (data) {
    data = JSON.parse(data);
    return {
      tasks: {
        past: [],
        present: data.tasks,
        future: [],
        history: [],
      },
      ideas: {
        past: [],
        present: data.ideas,
        future: [],
        history: [],
      },
      appProperties: data.appProperties,
      appUI: {
        FABRaised: false,
        currentTab: data.appProperties.startupTab,
      },
    };
  }
  return null;
};
const update = (state) => {
  fs.writeFileSync(dbPath, JSON.stringify({
    tasks: state.tasks.present,
    ideas: state.ideas.present,
    appProperties: state.appProperties,
  }), 'utf-8');
};


export { fetchDatabaseState, update };
