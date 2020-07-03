import { monthlyEarning } from "../component/firebaseConnect";
import { CONSTANTS } from "../component/constants";

const earningState = {
}

export const earningReducer = (state = earningState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_MONTHLY_EARNING:
            if (action.data.key) {
                // update data to firebase
                monthlyEarning.child(action.data.key).update({
                    date: action.data.date,
                    amount: action.data.amount,
                    title: action.data.title
                })
            } else {
                // create data
                monthlyEarning.push(action.data);
            }
            return {...state}
        case CONSTANTS.DELETE_MONTHLY_EARNING:
            monthlyEarning.child(action.keyData).remove();
            return state
        default:
            return state
    }
}
