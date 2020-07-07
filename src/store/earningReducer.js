import { monthlyEarning } from "../component/firebaseConnect";
import { CONSTANTS } from "../component/constants";

const earningState = {
    isOpenForm: false,
    isEdit: false,
    editData: {}
}

export const earningReducer = (state = earningState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_MONTHLY_EARNING:
            if (state.isEdit) {
                // update data to firebase
                monthlyEarning.child(action.data.key).update({
                    date: action.data.date,
                    amount: action.data.amount,
                    title: action.data.title
                })
            } else {
                // create data
                monthlyEarning.push(action.data);
            }
            return {...state}
        case CONSTANTS.CHANGE_EARNING_FORM:
            if (state.isOpenForm) {
                state.editData = {};
                state.isEdit = false;
            }
            return {...state, isOpenForm: !state.isOpenForm}
        case CONSTANTS.GET_EDIT_MONTHLY_EARNING_DATA:
            return {...state, editData: action.editData, isEdit: true}
        case CONSTANTS.DELETE_MONTHLY_EARNING:
            monthlyEarning.child(action.keyData).remove();
            return {...state}
        default:
            return state
    }
}
