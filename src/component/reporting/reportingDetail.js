import React, { Component } from 'react'
import { Table } from 'antd';
import 'antd/dist/antd.css';

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

export default class ReportingDetail extends Component {
    header() {
      return (
        <div className="text-center">
            Total Income: {this.props.totalEarning} - Total Expense: {this.props.totalExpense} = <b>Remaining: {this.props.totalEarning - this.props.totalExpense}</b>
        </div>
      )
    }

    render() {
        return (
            <div className="col">
                <Table 
                    columns={columns} 
                    dataSource={this.props.monthlyData}
                    pagination={{ position: ['center', 'center'] }} 
                    bordered
                    title={() => this.header()} 
                />
            </div>
        )
    }
}
