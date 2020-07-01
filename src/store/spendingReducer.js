import { spendingData } from "../component/firebaseConnect";
import { CONSTANTS } from "../component/constants";

const spendingState = {
    isOpenForm: false,
    isEdit: false,
    editData: {}
}

export const spendingReducer = (state = spendingState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_SPENDING:
            if (state.isEdit) {
                // update data to firebase
                spendingData.child(action.data.key).update({
                    title: action.data.title,
                    content: action.data.content,
                    date: action.data.date
                })
            } else {
                // create data
                spendingData.push(action.data);
            }
            return {...state}
        case CONSTANTS.CHANGE_FORM:
            if (state.isOpenForm) {
                state.editData = {};
                state.isEdit = false;
            }
            return {...state, isOpenForm: !state.isOpenForm}
        case CONSTANTS.GET_EDIT_DATA:
            return {...state, editData: action.editData, isEdit: true}
        case CONSTANTS.DELETE_DATA:
            spendingData.child(action.keyData).remove();
            return {...state}
        default:
            return state
    }
}
