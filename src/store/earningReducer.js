import { earningData, monthlyEarning } from "../component/firebaseConnect";
import { CONSTANTS } from "../component/constants";
import moment from 'moment';

const earningState = {
    isLoading: false,
    isOpenForm: false,
    isEdit: false,
    editData: {},
    monthlyData: {}
}

export const earningReducer = (state = earningState, action) => {
    switch (action.type) {
        // earningData
        case CONSTANTS.ADD_EARNING:
            if (state.isEdit) {
                // update data to firebase
                earningData.child(action.data.key).update({
                    milliseconds: moment(action.data.date).valueOf(),
                    date: action.data.date,
                    amount: action.data.amount,
                    title: action.data.title
                })
            } else {
                // create data
                earningData.push(action.data);
            }
            return {...state}
        case CONSTANTS.CHANGE_EARNING_FORM:
            if (state.isOpenForm) {
                state.editData = {};
                state.isEdit = false;
            }
            return {...state, isOpenForm: !state.isOpenForm}
        case CONSTANTS.GET_EDIT_EARNING_DATA:
            return {...state, editData: action.editData, isEdit: true}
        case CONSTANTS.DELETE_EARNING:
            earningData.child(action.keyData).remove();
            return {...state}
        // monthlyEarning
        case CONSTANTS.ADD_MONTHLY_EARNING:
            monthlyEarning.push(action.data.monthLyEarning)
            earningData.push(action.data.earning)
            return state
        case CONSTANTS.GET_MONTHLY_EARNING:
            return {...state, monthlyData: action.data}
        case CONSTANTS.UPDATE_IS_LOADING_EARNING_PAGE:
            return {...state, isLoading: action.status}
        default:
            return state
    }
}
