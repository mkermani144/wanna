import { combineReducers } from 'redux';
import undoable, { includeAction } from 'redux-undo';

import taskReducer from './reducers/task';
import ideaReducer from './reducers/idea';
import appPropertiesReducer from './reducers/appProperties';
import appUIReducer from './reducers/appUI';

const rootReducer = combineReducers({
  tasks: undoable(taskReducer, {
    limit: 1,
    filter: includeAction(['DO_TASK', 'DELETE_TASK']),
  }),
  ideas: undoable(ideaReducer, {
    limit: 1,
    filter: includeAction('DELETE_IDEA'),
  }),
  appProperties: appPropertiesReducer,
  appUI: appUIReducer,
});

export default rootReducer;
