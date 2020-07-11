import React, {Component} from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import { CONSTANTS } from '../constants';
import { expenseData } from '../firebaseConnect';
import { UTILS } from '../componentUtils';
import moment from 'moment';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
const { RangePicker } = DatePicker;


class ExpenseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalData: [],
        }
    }

    loadDataByMonth(pickedDate) {
        if(this.props.isFirstLoad) this.props.updateIsLoading(true);
        let startAt = moment(pickedDate[0], 'YYYY-MM-DD HH:mm').startOf('day').valueOf();
        let endAt = moment(pickedDate[1], 'YYYY-MM-DD HH:mm').endOf('day').valueOf();
        expenseData.orderByChild("milliseconds").startAt(startAt).endAt(endAt).on("value", (data) => {
            var originalData = [];
            // load data by firebase
            data.forEach((item) => {
                var data = {};
                data.key = item.key;
                data.title = item.val().title;
                data.date = item.val().date;
                data.amount = item.val().amount;
                data.amountByCurrency = UTILS.FORMAT_AMOUNT(item.val().amount);
                data.content = item.val().content;
                originalData.push(data);
            });
            // sort data by date
            originalData = originalData.sort((a,b) => {
                return new Date(b.date) - new Date(a.date);
            });

            this.setState({
                originalData,
            })
        });
    }

    UNSAFE_componentWillMount() {
        this.loadDataByMonth(this.props.pickedDate);
    }

    handleDayChange(date, dateString) {
        if (dateString[0] && dateString[1]) {
            this.loadDataByMonth(dateString);
            this.props.updatePickedDay(dateString);
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.updateIsLoading(false);
    }

    render() {
        return (
            <div className="col">
                <div className="col clearfix">
                    <RangePicker
                        showToday
                        onChange={(date, dateString) => this.handleDayChange(date, dateString)}
                        defaultValue={[moment(this.props.pickedDate[0], CONSTANTS.MONTH_FORMAT), moment(this.props.pickedDate[1], CONSTANTS.MONTH_FORMAT)]}
                        format={[CONSTANTS.DAY_FORMAT, CONSTANTS.DAY_FORMAT]}
                        />
                </div>
                <Table 
                    columns={this.EXPENSE_COLUMNS} 
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0, whiteSpace: "pre-line" }}>{record.content}</p>,
                        rowExpandable: record => record.content !== "" || record.content,
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
        pickedDate: state.reportingReducer.pickedDate,
        isFirstLoad: state.reportingReducer.isFirstLoad,
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
        },
        updatePickedDay: (pickedDate) => {
            dispatch({type: CONSTANTS.UPDATE_PICKED_DAY, pickedDate})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);