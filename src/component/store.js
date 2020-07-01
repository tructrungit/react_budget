import { combineReducers, createStore } from 'redux'
import { noteReducer } from './noteReducer';
import { userReducer } from './userReducer';

const allReducer = combineReducers({noteReducer, userReducer});
const store = createStore(allReducer);

export default store;