import { applyMiddleware, combineReducers, createStore } from 'redux'
import { expenseReducer } from './expenseReducer';
import { earningReducer } from './earningReducer';
import { loginReducer } from './loginReducer';
import thunk from 'redux-thunk';

const allReducer = combineReducers({expenseReducer, loginReducer, earningReducer});
const store = createStore(allReducer, applyMiddleware(thunk));

export default store;