import { CONSTANTS } from "../component/constants";
import { firebaseConnect } from "../component/firebaseConnect";

const loginState = {
    user: '',
    isLogin: false
}

export const loginReducer = (state = loginState, action) => {
    switch (action.type) {
        case CONSTANTS.LOGIN:
            let email = "tructrungit@gmail.com";
            let password = "123456";
            // firebaseConnect.auth().signInWithEmailAndPassword(email, password)
            //     .then(function(firebaseUser) {
            //         console.log('success')
            //         console.log(firebaseUser)
            //         return {...state, isLogin: true, user: email}
            //     })
            //     .catch(function(error) {
            //         console.log(error)
            //         return {...state, isLogin: false, user: ''};
            //     });
            return {...state, isLogin: true, user: email}
        default:
            return state
    }
}
