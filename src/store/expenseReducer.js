import { expenseData } from "../component/firebaseConnect";
import { CONSTANTS } from "../component/constants";

const expenseState = {
    isLoading: false,
    isOpenForm: false,
    isEdit: false,
    editData: {}
}

export const expenseReducer = (state = expenseState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_EXPENSE:
            if (state.isEdit) {
                // update data to firebase
                expenseData.child(action.data.key).update({
                    title: action.data.title,
                    amount: action.data.amount,
                    content: action.data.content,
                    date: action.data.date
                })
            } else {
                // create data
                expenseData.push(action.data);
            }
            return {...state}
        case CONSTANTS.CHANGE_EXPENSE_FORM:
            if (state.isOpenForm) {
                state.editData = {};
                state.isEdit = false;
            }
            return {...state, isOpenForm: !state.isOpenForm}
        case CONSTANTS.GET_EDIT_EXPENSE_DATA:
            return {...state, editData: action.editData, isEdit: true}
        case CONSTANTS.DELETE_EXPENSE_DATA:
            expenseData.child(action.keyData).remove();
            return {...state}
        case CONSTANTS.UPDATE_IS_LOADING:
            return {...state, isLoading: action.status}
        default:
            return state
    }
}
