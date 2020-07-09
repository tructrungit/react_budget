import React, { Component } from 'react'
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { expenseData } from '../firebaseConnect';

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
        multiple: 3,
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      sorter: {
        compare: (a, b) => a.amount - b.amount,
        multiple: 2,
      },
    },
    {
      title: 'Content',
      dataIndex: 'content',
    },
  ];

export default class ReportingDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    UNSAFE_componentWillMount() {
        // expenseData.orderByChild("date").startAt("2020-07-01").endAt("2020-07-30 23:59:59").on("value", (data) => {
        expenseData.orderByChild("date").startAt("2020-07-01").on("value", (data) => {
            console.log(data.val());
            var originalData = [];
            data.forEach((item) => {
                var data = {};
                data.key = item.key;
                data.title = item.val().title;
                data.amount = item.val().amount;
                data.content = item.val().content;
                data.date = item.val().date;
                originalData.push(data);
            })
            this.setState({data: originalData});
        });
        // expenseData.orderByChild('date').startAt("2020-07-01").endAt("2020-07-31").on('child_added', (notes) => {
        //     console.log(notes)
        // });
        // expenseData.on('value', (notes) => {
        //     var originalData = [];
        //     // load data by firebase
        //     notes.forEach((item) => {
        //         var data = {};
        //         data.key = item.key;
        //         data.title = item.val().title;
        //         data.amount = item.val().amount;
        //         data.content = item.val().content;
        //         data.date = item.val().date;
        //         originalData.push(data);
        //     });
        //     this.setState({data: originalData});
        // });
    }

    render() {
        return (
            <div className="col">
                <Table 
                    columns={columns} 
                    dataSource={this.state.data} 
                    // onChange={onChange} 
                />
            </div>
        )
    }
}

{/* <table className="table">
<thead className="thead-light">
<tr>
    <th scope="col">#</th>
    <th scope="col">Title</th>
    <th scope="col">Day</th>
    <th scope="col">Amount</th>
    <th scope="col">Content</th>
</tr>
</thead>
<tbody>
</tbody>
</table> */}