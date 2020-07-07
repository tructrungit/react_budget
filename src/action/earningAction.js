import { CONSTANTS } from "../component/constants";
import { salary } from "../component/firebaseConnect";
import moment from 'moment';

export const addMonthlyEarning = (earning) => ({
    type: CONSTANTS.ADD_EARNING,
    earning,
});

export const getSalary = () => async dispatch => {
    try {
        let month = moment(new Date()).format("YYYY-MM");
        let salaries = await salary.on('value');
        console.log(salaries);
        // dispatch(addMonthlyEarning(salaries));
    } catch (error) {
        console.log(error);
    }
}

export const logOutAction = () => ({
    type: CONSTANTS.LOG_OUT
})