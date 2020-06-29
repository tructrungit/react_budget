import { combineReducers, createStore } from 'redux'
import { noteReducer } from './noteReducer';

const allReducer = combineReducers({noteReducer});
const store = createStore(allReducer);

export default store;