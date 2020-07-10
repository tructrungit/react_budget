import React, { Component } from 'react'
import { connect } from 'react-redux';
import { CONSTANTS } from '../constants';
import ExpenseForm from './expenseForm';
import ExpenseList from './expenseList';
import LoadingComponent from '../loadingComponent';
import { getExpenseDataByMonth } from '../../action/reportingAction';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
const { RangePicker } = DatePicker;
import moment from 'moment';

class ExpensePage extends Component {
    UNSAFE_componentWillMount() {
        this.props.updateIsLoading(true);
        this.props.getExpenseDataByMonth(this.props.pickedDate);
    }

    handleDayChange(date, dateString) {
        if (dateString) {
            this.props.updateIsLoading(true);
            this.props.updatePickedDay(dateString);
            this.props.getExpenseDataByMonth(dateString);
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <br/>
                    <div className="alert alert-info clearfix">
                        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0" style={{textTransform: 'uppercase'}}>Expense Management</h2>
                    </div>
                    <div className="clearfix">
                        {this.props.isOpenForm && <ExpenseForm/>}
                    </div>
                    <div className="alert clearfix">
                        {!this.props.isOpenForm && <button type="button" onClick={() => this.props.showHideExpanseForm()} className="btn btn-primary btn-lg btn-block">Create Expense Item</button>}
                    </div>
                    <div className="col clearfix">
                        <RangePicker
                            showToday
                            onChange={(date, dateString) => this.handleDayChange(date, dateString)}
                            defaultValue={[moment(this.props.pickedDate[0], CONSTANTS.MONTH_FORMAT).subtract(1, 'months'), moment(this.props.pickedDate[1], CONSTANTS.MONTH_FORMAT)]}
                            format={[CONSTANTS.DAY_FORMAT, CONSTANTS.DAY_FORMAT]}
                            />
                    </div>
                    {this.props.isLoading && <LoadingComponent/>}
                    <div className="row">
                        <ExpenseList expenseData={this.props.expenseData}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isOpenForm: state.expenseReducer.isOpenForm,
        isLoading: state.expenseReducer.isLoading,
        pickedDate: state.reportingReducer.pickedDate,
        expenseData: state.reportingReducer.expenseData,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showHideExpanseForm: () => {
            dispatch({type: CONSTANTS.CHANGE_EXPENSE_FORM})
        },
        updateIsLoading: (status) => {
            dispatch({type: CONSTANTS.UPDATE_IS_LOADING_EXPENSE_PAGE, status})
        },
        updatePickedDay: (pickedDate) => {
            dispatch({type: CONSTANTS.UPDATE_PICKED_DAY, pickedDate})
        },
        getExpenseDataByMonth: (pickedDate) => {
            dispatch(getExpenseDataByMonth(pickedDate))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensePage);
