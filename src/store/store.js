import { applyMiddleware, combineReducers, createStore } from 'redux'
import { spendingReducer } from './spendingReducer';
import { loginReducer } from './loginReducer';
import thunk from 'redux-thunk';

const allReducer = combineReducers({spendingReducer, loginReducer});
const store = createStore(allReducer, applyMiddleware(thunk));

export default store;