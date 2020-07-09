import React, {Component} from 'react';
import { expenseData } from '../firebaseConnect';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import { CONSTANTS } from '../constants';
import { UTILS } from '../componentUtils';

class ExpenseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalData: [],
        }
    }

    edit(value) {
        this.props.editData(value);
        this.props.showHideExpenseForm();
        window.scrollTo(0, 0)
    }
    
    EXPENSE_COLUMNS = [
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
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record) => (
                <div>
                    {!this.props.isEdit && !this.props.isOpenForm && <input type="button" className="btn btn-outline-warning" value="Edit" onClick={() => this.edit(record)}/>}	&nbsp;
                    <input type="button" className="btn btn-outline-danger" value="Delete" onClick={() => {if(window.confirm('Delete the item?'))this.props.deleteData(record.key)}}/>
                </div>
            ),
        },
      ]

    UNSAFE_componentWillMount() {
        expenseData.on('value', (notes) => {
            var originalData = [];
            // load data by firebase
            notes.forEach((item) => {
                var data = {};
                data.key = item.key;
                data.title = item.val().title;
                data.amount = item.val().amount;
                data.amountByCurrency = UTILS.FORMAT_AMOUNT(item.val().amount);
                data.content = item.val().content;
                data.date = item.val().date;
                originalData.push(data);
            });
            // sort data by date
            originalData = originalData.sort((a,b) => {
                return new Date(b.date) - new Date(a.date);
            });
            this.setState({originalData })
        })
    }

    render() {
        return (
            <div className="col">
                <Table 
                    columns={this.EXPENSE_COLUMNS} 
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.content}</p>,
                        rowExpandable: record => record.content !== '' || !record.content,
                    }}
                    dataSource={this.state.originalData}
                    pagination={{ position: ['topCenter', 'bottomCenter'] }}
                    bordered
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isOpenForm: state.expenseReducer.isOpenForm,
        isEdit: state.expenseReducer.isEdit,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showHideExpenseForm: () => {
            dispatch({type: CONSTANTS.CHANGE_EXPENSE_FORM})
        },
        editData: (editData) => {
            dispatch({type: CONSTANTS.GET_EDIT_EXPENSE_DATA, editData})
        },
        deleteData: (keyData) => {
            dispatch({type: CONSTANTS.DELETE_EXPENSE_DATA, keyData})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);