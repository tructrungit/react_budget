import React, {Component} from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import { CONSTANTS } from '../constants';

class ExpenseList extends Component {
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.updateIsLoading(false);
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
                    dataSource={this.props.expenseData}
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
        },
        updateIsLoading: (status) => {
            dispatch({type: CONSTANTS.UPDATE_IS_LOADING_EXPENSE_PAGE, status})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);