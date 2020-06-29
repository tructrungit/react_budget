import { noteData } from "./firebaseConnect";

const noteState = {
    test: false
}

export const noteReducer = (state = noteState, action) => {
    switch (action.type) {
        case 'ADD_NOTE':
            console.log('connect-----------' + action.data)
            noteData.push(action.data);
            return state
        default:
            return state
    }
}
