import { CONSTANTS } from "../component/constants";
import { firebaseConnect } from "../component/firebaseConnect";

const loginState = {
    user: '',
    isLogin: false
}

export const loginReducer = (state = loginState, action) => {
    switch (action.type) {
        case CONSTANTS.LOGIN_SUCCESS:
            return {...state, isLogin: true, user: action.user}
        case CONSTANTS.LOGIN_FAIL:
            return {...state, isLogin: false, user: ""}
        case CONSTANTS.LOG_OUT:
            return {...state, isLogin: false, user: ""}
        default:
            return state
    }
}
