import { applyMiddleware, combineReducers, createStore } from 'redux'
import { noteReducer } from './noteReducer';
import { loginReducer } from './loginReducer';
import thunk from 'redux-thunk';

const allReducer = combineReducers({noteReducer, loginReducer});
const store = createStore(allReducer, applyMiddleware(thunk));

export default store;