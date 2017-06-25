const fs = window.require('fs');

const fetchInitialState = () => {
  const data = fs.readFileSync('.config/db', 'utf-8');
  if (data) {
    return JSON.parse(data);
  } else {
    return {};
  }
}
const update = (state) => {
  fs.writeFileSync('.config/db', JSON.stringify(state), 'utf-8');
}


export { fetchInitialState, update };
