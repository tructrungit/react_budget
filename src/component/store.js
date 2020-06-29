import { combineReducers, createStore } from 'redux'
import { noteReducer } from './noteReducer';

// const allReducer = combineReducers(noteReducer);
const store = createStore(noteReducer);

export default store;