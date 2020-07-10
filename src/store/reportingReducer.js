import { CONSTANTS } from "../component/constants";
import moment from 'moment';

const reportingState = {
    isLoading: false,
    pickedDate: [moment(new Date()).subtract(1, 'months').format(CONSTANTS.DAY_FORMAT), moment(new Date()).format(CONSTANTS.DAY_FORMAT)],
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
        case CONSTANTS.UPDATE_IS_LOADING_REPORTING_PAGE:
            return {...state, isLoading: action.status}
        case CONSTANTS.UPDATE_PICKED_DAY:
            return {...state, pickedDate: action.pickedDate}
        default:
            return state
    }
}
