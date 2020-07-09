import React, {Component} from 'react';
import { connect } from 'react-redux';
import { earningData } from '../firebaseConnect';
import "react-pagination-library/build/css/index.css";
import { CONSTANTS } from '../constants';
import 'react-day-picker/lib/style.css';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { UTILS } from '../componentUtils';

class EarningList extends Component {
    constructor(props) {
        super(props);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.state = {
            originalData: []
        }
    }
    
    EARNING_COLUMNS = [
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

    edit(value) {
        this.props.editData(value);
        this.props.showHideEarningForm();
        window.scrollTo(0, 0)
    }
    
    handleDayChange(selectedDay, modifiers, dayPickerInput) {
        let input = dayPickerInput.getInput();
        this.setState({
            selectedDay: selectedDay,
            formDate: input.value
        });
    }

    UNSAFE_componentWillMount() {
        earningData.on('value', (notes) => {
            var originalData = [];
            // load data by firebase
            notes.forEach((item) => {
                var data = {};
                data.key = item.key;
                data.title = item.val().title;
                data.date = item.val().date;
                data.amount = item.val().amount;
                data.amountByCurrency = UTILS.FORMAT_AMOUNT(item.val().amount);
                originalData.push(data);
            });
            // sort data by date
            originalData = originalData.sort((a,b) => {
                return new Date(b.date) - new Date(a.date);
            });
            this.setState({
                originalData
            })
        })
    }

    render() {
        return (
            <div className="col">
                <Table 
                    columns={this.EARNING_COLUMNS} 
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
        isOpenForm: state.earningReducer.isOpenForm,
        isEdit: state.earningReducer.isEdit,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteData: (keyData) => {
            dispatch({type: CONSTANTS.DELETE_EARNING, keyData})
        },
        editData: (editData) => {
            dispatch({type: CONSTANTS.GET_EDIT_EARNING_DATA, editData})
        },
        showHideEarningForm: () => {
            dispatch({type: CONSTANTS.CHANGE_EARNING_FORM})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EarningList);