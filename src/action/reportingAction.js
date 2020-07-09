import { expenseData, monthlyEarning, earningData } from "../component/firebaseConnect";
import moment from 'moment';
import { CONSTANTS } from "../component/constants";
import { UTILS } from "../component/componentUtils";

export const loadExpenseDataByMonth = (data) => ({
    type: CONSTANTS.GET_EXPENSE_DATA_BY_MONTH,
    data,
});

export const getExpenseDataByMonth = (pickedDate) => async dispatch => {
    try {
        let startAt = moment(pickedDate[0], 'YYYY-MM-DD HH:mm').startOf('day').valueOf();
        let endAt = moment(pickedDate[1], 'YYYY-MM-DD HH:mm').endOf('day').valueOf();
        let expenseDataByMonth = [];
        expenseData.orderByChild("milliseconds").startAt(startAt).endAt(endAt).on("value", (data) => {
            data.forEach((item) => {
                var data = {};
                data.key = item.key;
                data.title = item.val().title;
                data.amount = item.val().amount;
                data.amountByCurrency = UTILS.FORMAT_AMOUNT(item.val().amount);
                data.content = item.val().content;
                data.date = item.val().date;
                expenseDataByMonth.push(data);
            })
            dispatch(loadExpenseDataByMonth(expenseDataByMonth))
        });
    } catch (error) {
        console.log(error);
        dispatch(loadExpenseDataByMonth([]));
    }
}

export const loadEarningDataByMonth = (data) => ({
    type: CONSTANTS.GET_EARNING_DATA_BY_MONTH,
    data,
});

export const getEarningDataByMonth = (pickedDate) => async dispatch => {
    try {
        let startAt = moment(pickedDate[0], 'YYYY-MM-DD HH:mm').startOf('day').valueOf();
        let endAt = moment(pickedDate[1], 'YYYY-MM-DD HH:mm').endOf('day').valueOf();
        let earningDataByMonth = [];
        earningData.orderByChild("milliseconds").startAt(startAt).endAt(endAt).on("value", (data) => {
            data.forEach((item) => {
                var data = {};
                data.key = item.key;
                data.title = item.val().title;
                data.amount = item.val().amount;
                data.amountByCurrency = UTILS.FORMAT_AMOUNT(item.val().amount);
                data.date = item.val().date;
                earningDataByMonth.push(data);
            })
            dispatch(loadEarningDataByMonth(earningDataByMonth))
        });
    } catch (error) {
        console.log(error);
        dispatch(loadEarningDataByMonth([]));
    }
}

// TODO: will use function at other time
export const loadMonthlyEarning = (data) => ({
    type: CONSTANTS.GET_MONTHLY_EARNING,
    data,
});

export const getMonthlyEarning = (pickedDate) => async dispatch => {
    try {
        let milliseconds = moment(pickedDate[0]).valueOf();
        await monthlyEarning.orderByChild("milliseconds").equalTo(milliseconds).on("value", (data) => {
            if (data.length === 1) {
                dispatch(loadMonthlyEarning(data[0].val()));
            } else {
                dispatch(loadMonthlyEarning({}));
            }
            
        });
    } catch (error) {
        console.log(error);
        dispatch(loadMonthlyEarning({}));
    }
}