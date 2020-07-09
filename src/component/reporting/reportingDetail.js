import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { CONSTANTS } from '../constants';

class ReportingDetail extends Component {
    header() {
      return (
        <div>
            - Total Income: {this.props.totalEarning} <br/> 
            - Total Expense: {this.props.totalExpense} <br/>
            <b>- Remaining: {this.props.totalEarning - this.props.totalExpense}</b>
        </div>
      )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      this.props.updateIsLoading(false);
    }

    render() {
        return (
            <div className="col">
                <Table 
                    columns={CONSTANTS.REPORT_COLUMNS} 
                    dataSource={this.props.monthlyData}
                    pagination={{ position: ['topCenter', 'bottomCenter'] }}
                    bordered
                    title={() => this.header()} 
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
      isLoading: state.reportingReducer.isLoading
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      updateIsLoading: (status) => {
          dispatch({type: CONSTANTS.UPDATE_IS_LOADING, status})
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportingDetail);