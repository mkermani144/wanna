import { combineReducers } from 'redux';

import taskReducer from './reducers/task';
import ideaReducer from './reducers/idea';
import appPropertiesReducer from './reducers/appProperties';

const rootReducer = combineReducers({
  tasks: taskReducer,
  ideas: ideaReducer,
  appProperties: appPropertiesReducer,
});

export default rootReducer;
