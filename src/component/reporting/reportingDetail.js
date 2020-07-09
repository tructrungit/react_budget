import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { CONSTANTS } from '../constants';

const columns = [
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
    },
    {
      title: 'Content',
      dataIndex: 'content',
    },
  ];

class ReportingDetail extends Component {
    header() {
      return (
        <div className="text-center">
            Total Income: {this.props.totalEarning} - Total Expense: {this.props.totalExpense} = <b>Remaining: {this.props.totalEarning - this.props.totalExpense}</b>
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
                    columns={columns} 
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