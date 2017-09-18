import { createStore } from 'redux';
import rootReducer from './reducer';

import { fetchDatabaseState } from './lib/database';

const initialStateFactory = () => ({
  tasks: [],
  ideas: [],
  appProperties: {
    showNotYetTasks: true,
    fullscreen: false,
    calendarSystem: 'en-US',
    firstDayOfWeek: 1,
  },
  appUI: {
    fabRaised: false,
    currentTab: 'tasks',
  },
});

const fetchState = () => fetchDatabaseState() || initialStateFactory();

const defaultState = fetchState();

const store = createStore(rootReducer, defaultState);

export default store;
