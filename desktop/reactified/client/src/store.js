import { createStore } from 'redux';
import rootReducer from './reducer';

const defaultState = {

};

const store = createStore(rootReducer, defaultState);

export default store;
