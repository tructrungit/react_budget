import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { CONSTANTS } from '../constants';
import { UTILS } from '../componentUtils';

class ReportingDetail extends Component {
    REPORT_COLUMNS = [
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
        dataIndex: 'amountByCurrency',
        sorter: {
          compare: (a, b) => a.amount - b.amount,
          multiple: 2,
        },
      },
      {
        title: 'Content',
        dataIndex: 'content',
      },
    ]

    title() {
      return (
        <div>
            - Total Income: {UTILS.FORMAT_AMOUNT(this.props.totalEarning)} <br/> 
            - Total Expense: {UTILS.FORMAT_AMOUNT(this.props.totalExpense)} <br/>
            <b>- Remaining: {UTILS.FORMAT_AMOUNT(this.props.totalEarning - this.props.totalExpense)}</b>
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
                    columns={this.REPORT_COLUMNS} 
                    dataSource={this.props.monthlyData}
                    pagination={{ position: ['topCenter', 'bottomCenter'] }}
                    bordered
                    title={() => this.title()} 
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