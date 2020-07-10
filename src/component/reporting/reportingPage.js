import React, { Component } from 'react'
import { connect } from 'react-redux';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
const { RangePicker } = DatePicker
import moment from 'moment';
import { CONSTANTS } from '../constants';
import ReportingDetail from './reportingDetail';
import { getExpenseDataByMonth, getEarningDataByMonth } from '../../action/reportingAction';
import LoadingComponent from '../loadingComponent';


class ReportingPage extends Component {
    UNSAFE_componentWillMount() {
        this.props.updateIsLoading(true);
        this.props.getExpenseDataByMonth(this.props.pickedDate);
        this.props.getEarningDataByMonth(this.props.pickedDate);
    }

    handleDayChange(date, dateString) {
        if (dateString) {
            this.props.updateIsLoading(true);
            this.props.updatePickedDay(dateString);
            this.props.getExpenseDataByMonth(dateString);
            this.props.getEarningDataByMonth(dateString);
        }
    }

    getTotalExpense() {
        return this.props.expenseData.reduce((accumulator, item) => accumulator + Number(item.amount), 0);
    }

    getTotalEarning() {
        return this.props.earningData.reduce((accumulator, item) => accumulator + Number(item.amount), 0);
    }

    render() {
        return (
            <div>
                <div className="container">
                    <br/>
                    <div className="alert alert-info clearfix">
                        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0" style={{textTransform: 'uppercase'}}>Reporting From {this.props.pickedDate[0]} To {this.props.pickedDate[1]}</h2>
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
        updateIsLoading: (status) => {
            dispatch({type: CONSTANTS.UPDATE_IS_LOADING_REPORTING_PAGE, status})
        }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ReportingPage);