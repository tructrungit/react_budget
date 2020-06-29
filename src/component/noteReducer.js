import { noteData } from "./firebaseConnect";

const noteState = {
    isShowForm: false
}

export const noteReducer = (state = noteState, action) => {
    switch (action.type) {
        case 'ADD_NOTE':
            console.log('connect-----------' + action.data)
            noteData.push(action.data);
            return state
        case 'CHANGE_IS_SHOW_FORM_STATE':
            return {...state, isShowForm: !state.isShowForm}
        default:
            return state
    }
}
