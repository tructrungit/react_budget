import { CONSTANTS } from "../component/constants";
import moment from 'moment';

const reportingState = {
    isLoading: false,
    pickedDate: moment().format('YYYY-M'),
    expenseData: [],
    earningData: [],
    monthlyEarningData: {}
}

export const reportingReducer = (state = reportingState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_EXPENSE_DATA_BY_MONTH:
            return {...state, expenseData: action.data}
        case CONSTANTS.GET_EARNING_DATA_BY_MONTH:
            return {...state, earningData: action.data}
        case CONSTANTS.GET_MONTHLY_EARNING:
            return {...state, monthlyEarningData: action.data}
        case CONSTANTS.UPDATE_IS_LOADING:
            return {...state, isLoading: action.status}
        case CONSTANTS.UPDATE_PICKED_DAY:
            return {...state, pickedDate: action.pickedDate}
        default:
            return state
    }
}
