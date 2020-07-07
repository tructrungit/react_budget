import { CONSTANTS } from "../component/constants";

const loginState = {
    user: '',
    isLogin: true
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
