import React, { Component } from 'react'
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import { CONSTANTS } from '../constants';
import ReportingDetail from './reportingDetail';
const { MonthPicker } = DatePicker

export default class ReportingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickedDate: moment().format('YYYY-M'),
        }
    }

    handleDayChange(date, dateString) {
        if (dateString) {
            this.setState({
                pickedDate: dateString
            });
        }
        console.log(this.state.pickedDate);
    }

    render() {
        return (
            <div>
                <div className="container">
                    <br/>
                    <div className="alert alert-info clearfix">
                        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0" style={{textTransform: 'uppercase'}}>Reporting {this.state.pickedDate}</h2>
                    </div>
                    <div className="col clearfix">
                        <MonthPicker
                            onChange={(date, dateString) => this.handleDayChange(date, dateString)}
                            defaultValue={moment(new Date(), CONSTANTS.MONTH_FORMAT)}
                            format={CONSTANTS.MONTH_FORMAT}
                        />
                    </div>
                    <br/>
                    <ReportingDetail pickedDate={this.state.pickedDate}/>
                </div>
            </div>
        )
    }
}
