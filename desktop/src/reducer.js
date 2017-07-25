import { combineReducers } from 'redux';

import taskReducer from './reducers/task';
import ideaReducer from './reducers/idea';
import appPropertiesReducer from './reducers/appProperties';
import appUIReducer from './reducers/appUI';

const rootReducer = combineReducers({
  tasks: taskReducer,
  ideas: ideaReducer,
  appProperties: appPropertiesReducer,
  appUI: appUIReducer,
});

export default rootReducer;
