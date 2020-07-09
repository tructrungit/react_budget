import React, { Component } from 'react'
import { connect } from 'react-redux';
import { DatePicker, Spin, Alert } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import { CONSTANTS } from '../constants';
import ReportingDetail from './reportingDetail';
import { getExpenseDataByMonth, getMonthlyEarning, getEarningDataByMonth } from '../../action/reportingAction';
const { MonthPicker } = DatePicker

class ReportingPage extends Component {
    UNSAFE_componentWillMount() {
        this.props.updateIsLoading(true);
        this.props.getExpenseDataByMonth(this.props.pickedDate);
        this.props.getEarningDataByMonth(this.props.pickedDate);
        this.props.getMonthlyEarning(this.props.pickedDate);
    }

    handleDayChange(date, dateString) {
        if (dateString) {
            this.props.updateIsLoading(true);
            this.props.updatePickedDay(dateString);
            this.props.getExpenseDataByMonth(dateString);
            this.props.getEarningDataByMonth(dateString);
            this.props.getMonthlyEarning(dateString);
        }
    }

    getTotalExpense() {
        return this.props.expenseData.reduce((accumulator, item) => accumulator + Number(item.amount), 0);
    }

    getTotalEarning() {
        let earning = this.props.earningData.reduce((accumulator, item) => accumulator + Number(item.amount), 0);
        return earning + Number((this.props.monthlyEarningData.totalSalary || 0))
    }

    loadSpin() {
        return (
            <div>
                <Spin tip="Loading...">
                    <Alert
                    message="Loading..."
                    description="Please wait..."
                    type="info"
                    />
                </Spin>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className="container">
                    <br/>
                    <div className="alert alert-info clearfix">
                        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0" style={{textTransform: 'uppercase'}}>Reporting {this.props.pickedDate}</h2>
                    </div>
                    <div className="col clearfix">
                        <MonthPicker
                            onChange={(date, dateString) => this.handleDayChange(date, dateString)}
                            defaultValue={moment(new Date(), CONSTANTS.MONTH_FORMAT)}
                            format={CONSTANTS.MONTH_FORMAT}
                        />
                    </div>
                    {this.props.isLoading && this.loadSpin()}
                    <br/>
                    <ReportingDetail 
                        monthlyData={this.props.expenseData} 
                        totalEarning={this.getTotalEarning()}
                        totalExpense={this.getTotalExpense()}/>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        pickedDate: state.reportingReducer.pickedDate,
        expenseData: state.reportingReducer.expenseData,
        earningData: state.reportingReducer.earningData,
        monthlyEarningData: state.reportingReducer.monthlyEarningData,
        isLoading: state.reportingReducer.isLoading
    }
  }
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updatePickedDay: (pickedDate) => {
            dispatch({type: CONSTANTS.UPDATE_PICKED_DAY, pickedDate})
        },
        getExpenseDataByMonth: (pickedDate) => {
            dispatch(getExpenseDataByMonth(pickedDate))
        },
        getEarningDataByMonth: (pickedDate) => {
            dispatch(getEarningDataByMonth(pickedDate))
        },
        getMonthlyEarning: (pickedDate) => {
            dispatch(getMonthlyEarning(pickedDate))
        },
        updateIsLoading: (status) => {
            dispatch({type: CONSTANTS.UPDATE_IS_LOADING, status})
        }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ReportingPage);