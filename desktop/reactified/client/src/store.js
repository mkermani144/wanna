import { createStore } from 'redux';
import rootReducer from './reducer';

import { fetchInitialState } from './lib/database';

const defaultState = fetchInitialState() || {
  tasks: [],
  ideas: [],
  showNotYetTasks: true,
};

const store = createStore(rootReducer, defaultState);

export default store;
