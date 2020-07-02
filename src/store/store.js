import { applyMiddleware, combineReducers, createStore } from 'redux'
import { expenseReducer } from './expenseReducer';
import { loginReducer } from './loginReducer';
import thunk from 'redux-thunk';

const allReducer = combineReducers({expenseReducer, loginReducer});
const store = createStore(allReducer, applyMiddleware(thunk));

export default store;