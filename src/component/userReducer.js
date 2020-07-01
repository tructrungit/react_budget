import { firebaseConnect } from "./firebaseConnect";
import { CONSTANTS } from "./constants";

const userState = {
    user: '',
    isLogin: false
}

export const userReducer = (state = userState, action) => {
    switch (action.type) {
        case CONSTANTS.LOGIN:
            var email = "tructrungit@gmail.com";
            var password = "123456";
            console.log(123)

            firebaseConnect.auth().signInWithEmailAndPassword(email, password)
                .then(function(firebaseUser) {
                    console.log('success')
                    console.log(firebaseUser)
                    return {...state, isLogin: true}
                })
                .catch(function(error) {
                    console.log(error)
                    return state;
                });
        default:
            return state
    }
}
