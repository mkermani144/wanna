/* eslint-env browser */

let fs;
if (process.env.REACT_APP_E2E) {
  fs = {
    readFileSync() {},
    writeFileSync() {},
  };
} else {
  fs = window.require('fs');
}

const fetchDatabaseState = () => {
  let data = fs.readFileSync('.config/db', 'utf-8');
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
        currentTab: 'tasks',
      },
    };
  }
  return null;
};
const update = (state) => {
  fs.writeFileSync('.config/db', JSON.stringify({
    tasks: state.tasks.present,
    ideas: state.ideas.present,
    appProperties: state.appProperties,
  }), 'utf-8');
};


export { fetchDatabaseState, update };
