import { noteData } from "./firebaseConnect";
import { CONSTANTS } from "./constants";

const noteState = {
    isOpenForm: false,
    isEdit: false,
    editData: {}
}

export const noteReducer = (state = noteState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_NOTE:
            if (state.isEdit) {
                // update data to firebase
                noteData.child(action.data.key).update({
                    title: action.data.title,
                    content: action.data.content
                })
            } else {
                // create data
                noteData.push(action.data);
            }
            state.editData = {};
            state.isEdit = false;
            return state
        case CONSTANTS.CHANGE_FORM:
            if (state.isOpenForm) {
                state.editData = {};
                state.isEdit = false;
            }
            return {...state, isOpenForm: !state.isOpenForm}
        case CONSTANTS.GET_EDIT_DATA:
            return {...state, editData: action.editData, isEdit: true}
        default:
            return state
    }
}
