import { monthlyEarning } from "../component/firebaseConnect";
import moment from 'moment';

// export const addMonthlyEarning = (earning) => ({
//     type: CONSTANTS.ADD_EARNING,
//     earning,
// });

export const getMonthlyEarning = () => async dispatch => {
    try {
        console.log('getMonthlyEarning');
        let monthlyEarningData = {};
        await monthlyEarning.orderByChild("date").equalTo(moment().format('YYYY-MM')).on("child_added", (data) => {
            monthlyEarningData = data.val();
        });
        return monthlyEarningData;
    } catch (error) {
        console.log(error);
        return {};
    }
}