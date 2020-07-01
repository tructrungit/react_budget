import { CONSTANTS } from "../component/constants";
import { firebaseConnect } from "../component/firebaseConnect";

export const loginSuccessAction = (user) => ({
    type: CONSTANTS.LOGIN_SUCCESS,
    user,
});

export const loginFailAction = (user) => ({
    type: CONSTANTS.LOGIN_FAIL
})

export const getUser = (email, password) => async dispatch => {
    try {
        await firebaseConnect.auth().signInWithEmailAndPassword(email, password);
        dispatch(loginSuccessAction(email));
    } catch (error) {
        dispatch(loginFailAction());
    }
}

export const logOutAction = () => ({
    type: CONSTANTS.LOG_OUT
})