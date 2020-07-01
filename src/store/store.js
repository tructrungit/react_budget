import { combineReducers, createStore } from 'redux'
import { noteReducer } from './noteReducer';
import { loginReducer } from './loginReducer';

const allReducer = combineReducers({noteReducer, loginReducer});
const store = createStore(allReducer);

export default store;