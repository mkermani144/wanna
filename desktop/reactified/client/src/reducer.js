import { combineReducers } from 'redux';

import taskReducer from './reducers/task';
import ideaReducer from './reducers/idea';
import showNotYetReducer from './reducers/showNotYet';

const rootReducer = combineReducers({
  tasks: taskReducer,
  ideas: ideaReducer,
  showNotYetTasks: showNotYetReducer,
});

export default rootReducer;
