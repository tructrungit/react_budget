export const CONSTANTS = {
    // Date format
    DAY_FORMAT: 'YYYY-MM-DD',
    // Pagnition
    ITEM_PER_PAGE: 5,
    // Login
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',
    LOG_OUT: 'LOG_OUT',
    // Expense
    ADD_EXPENSE: 'ADD_EXPENSE',
    CHANGE_EXPENSE_FORM: 'CHANGE_EXPENSE_FORM',
    CLOSE_FROM: 'CLOSE_FROM',
    GET_EDIT_EXPENSE_DATA: 'GET_EDIT_EXPENSE_DATA',
    DELETE_EXPENSE_DATA: 'DELETE_EXPENSE_DATA',
    // Earning
    ADD_EARNING: 'ADD_EARNING',
    CHANGE_EARNING_FORM: 'CHANGE_EARNING_FORM',
    GET_EDIT_EARNING_DATA: 'GET_EDIT_EARNING_DATA',
    DELETE_EARNING: 'DELETE_EARNING',
    // Monthly Earning
    ADD_MONTHLY_EARNING: 'ADD_MONTHLY_EARNING',
    // Reporting
    GET_EXPENSE_DATA_BY_MONTH: 'GET_EXPENSE_DATA_BY_MONTH',
    GET_EARNING_DATA_BY_MONTH: 'GET_EARNING_DATA_BY_MONTH',
    GET_MONTHLY_EARNING: 'GET_MONTHLY_EARNING',
    UPDATE_IS_LOADING: 'UPDATE_IS_LOADING',
    UPDATE_PICKED_DAY: 'UPDATE_PICKED_DAY',
    // Table columns
    REPORT_COLUMNS: [
        {
          title: 'Title',
          dataIndex: 'title',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          sorter: {
            compare: (a, b) => new Date(a.date) - new Date(b.date),
            multiple: 2,
          },
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          sorter: {
            compare: (a, b) => a.amount - b.amount,
            multiple: 2,
          },
        },
        {
          title: 'Content',
          dataIndex: 'content',
        },
      ],
}