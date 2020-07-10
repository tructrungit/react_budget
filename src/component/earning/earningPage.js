import React, { Component } from 'react'
import { salary, monthlyEarning } from '../firebaseConnect'
import EarningList from './earningList';
import EarningForm from './earningForm';
import { connect } from 'react-redux';
import { CONSTANTS } from '../constants';
import moment from 'moment';
import LoadingComponent from '../loadingComponent';
import { getEarningDataByMonth } from '../../action/reportingAction';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
const { RangePicker } = DatePicker;

class EarningPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSalary: 0,
            monthlyEarning: {}
        }
    }

    addMonthlyEarning() {
        let data = {monthLyEarning: {}, earning: {}};
        // monthLyEarning
        data.monthLyEarning.totalSalary = this.state.totalSalary;
        data.monthLyEarning.date = moment().format('YYYY-MM');
        data.monthLyEarning.milliseconds = moment(data.date).valueOf();
        // earning
        data.earning.title = 'Salary per month';
        data.earning.amount = this.state.totalSalary;
        data.earning.date = moment().format('YYYY-MM-DD');
        data.earning.milliseconds = moment(data.earning.date).valueOf();
        this.props.addMonthlyEarning(data);
    }

    UNSAFE_componentWillMount() {
        this.props.updateIsLoading(true);
        this.props.getEarningDataByMonth(this.props.pickedDate);
        salary.on('value', (items) => {
            let totalSalary = 0
            items.forEach(item => {
                totalSalary += Number(item.val());
            })
            this.setState({totalSalary})
        })        

        monthlyEarning.orderByChild("date").equalTo(moment().format('YYYY-MM')).on("child_added", (data) => {
            this.setState({monthlyEarning: data.val()})
         });
    }

    handleDayChange(date, dateString) {
        if (dateString) {
            this.props.updateIsLoading(true);
            this.props.updatePickedDay(dateString);
            this.props.getEarningDataByMonth(dateString);
        }
    }

    render() {
        return (
            <div className="container">
                <br/>
                <div className="alert alert-info clearfix">
                    <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0" style={{textTransform: 'uppercase'}}>Income Management</h2>
                </div>
                <div className="clearfix">
                    {this.props.isOpenForm && <EarningForm/>}
                </div>
                <div className="alert clearfix">
                    {!this.props.isOpenForm && <button type="button" onClick={() => this.props.showHideEarningForm()} className="btn btn-primary btn-lg btn-block">Create Income Item</button>}
                    {!this.props.isOpenForm && !this.state.monthlyEarning.date && <button type="button" onClick={() => this.addMonthlyEarning()} className="btn btn-warning btn-lg btn-block">Create Monthly Earning Item</button>}
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
                    <EarningList earningData={this.props.earningData}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isOpenForm: state.earningReducer.isOpenForm,
        isLoading: state.earningReducer.isLoading,
        pickedDate: state.reportingReducer.pickedDate,
        earningData: state.reportingReducer.earningData,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showHideEarningForm: () => {
            dispatch({type: CONSTANTS.CHANGE_EARNING_FORM})
        },
        addMonthlyEarning: (data) => {
            dispatch({type: CONSTANTS.ADD_MONTHLY_EARNING, data})
        },
        updateIsLoading: (status) => {
            dispatch({type: CONSTANTS.UPDATE_IS_LOADING_EARNING_PAGE, status})
        },
        updatePickedDay: (pickedDate) => {
            dispatch({type: CONSTANTS.UPDATE_PICKED_DAY, pickedDate})
        },
        getEarningDataByMonth: (pickedDate) => {
            dispatch(getEarningDataByMonth(pickedDate))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EarningPage);