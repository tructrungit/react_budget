import { combineReducers, createStore } from 'redux'
import { noteReducer } from './noteReducer';

const allReducer = combineReducers({noteReducer});
const store = createStore(allReducer);
console.log(store.getState());

export default store;