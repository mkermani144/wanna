import { createStore } from 'redux';
import rootReducer from './reducer';

const defaultState = {
  tasks: [],
  ideas: [],
  showNotYetTasks: true,
};

const store = createStore(rootReducer, defaultState);

export default store;
