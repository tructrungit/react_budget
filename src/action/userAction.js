import { CONSTANTS } from "../component/constants";
import { firebaseConnect } from "../component/firebaseConnect";
import * as firebase from 'firebase'

const VALID_EMAILS = ['tructrungit@gmail.com', 'yenlacit@gmail.com']
const VALID_UID = ['dhr7TV2G3cUOHdiantC0M7I5UKf2', 'Zy5Ciu2GppO1d0yZH7DU1dLBgVc2']

export const loginSuccessAction = (user) => ({
    type: CONSTANTS.LOGIN_SUCCESS,
    user,
});

export const loginFailAction = (user) => ({
    type: CONSTANTS.LOGIN_FAIL
})

export const getUser = (email, password) => async dispatch => {
    try {
        await firebaseConnect.auth().signInWithEmailAndPassword(email, password)
        .then(function(firebaseUser) {
            if (VALID_EMAILS.includes(firebaseUser.user.email)) {
                dispatch(loginSuccessAction(firebaseUser.user)); 
            } else {
                dispatch({type: CONSTANTS.LOG_OUT})
            }
        })
        .catch(function(error) {
            console.log(error);
            dispatch(loginFailAction());
        });
    } catch (error) {
        dispatch(loginFailAction());
    }
}

export const logOutAction = () => async dispatch => {
    await firebaseConnect.auth().signOut().then(function() {
        dispatch({type: CONSTANTS.LOG_OUT})
    }).catch(function(error) {
        console.log(error)
    });
}

export const googleLogin = () => async dispatch => {
    console.log('Start file login with firebase');
    // Initialize Firebase

    //Google singin provider
    var ggProvider = new firebase.auth.GoogleAuthProvider();

    //Sing in with Google
    await firebaseConnect.auth().signInWithPopup(ggProvider).then(function(result) {
        // var token = result.credential.accessToken;
        // var userId = user.uid;
        if (VALID_UID.includes(result.user.uid)) {
            dispatch(loginSuccessAction(result.user));
        } else {
            dispatch({type: CONSTANTS.LOG_OUT})
        }
    }).catch(function(error) {
        console.error('Error: hande error here>>>', error.code)
    })
}