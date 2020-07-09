import React, { Component } from 'react'
import { salary, monthlyEarning } from '../firebaseConnect'
import EarningList from './earningList';
import EarningForm from './earningForm';
import { connect } from 'react-redux';
import { CONSTANTS } from '../constants';
import moment from 'moment';

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
                <div className="row">
                    <EarningList/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isOpenForm: state.earningReducer.isOpenForm,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showHideEarningForm: () => {
            dispatch({type: CONSTANTS.CHANGE_EARNING_FORM})
        },
        addMonthlyEarning: (data) => {
            dispatch({type: CONSTANTS.ADD_MONTHLY_EARNING, data})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EarningPage);