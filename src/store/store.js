import { applyMiddleware, combineReducers, createStore } from 'redux'
import { expenseReducer } from './expenseReducer';
import { earningReducer } from './earningReducer';
import { loginReducer } from './loginReducer';
import { reportingReducer } from './reportingReducer';
import thunk from 'redux-thunk';

const allReducer = combineReducers({expenseReducer, loginReducer, earningReducer, reportingReducer});
const store = createStore(allReducer, applyMiddleware(thunk));

export default store;