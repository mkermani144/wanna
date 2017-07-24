/* eslint-env browser */

const fs = window.require('fs');

const fetchInitialState = () => {
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
    };
  }
  return {};
};
const update = (state) => {
  fs.writeFileSync('.config/db', JSON.stringify({
    tasks: state.tasks.present,
    ideas: state.ideas.present,
    appProperties: state.appProperties,
  }), 'utf-8');
};


export { fetchInitialState, update };
