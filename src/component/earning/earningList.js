import React, {Component} from 'react';
import { connect } from 'react-redux';
import { monthlyEarning } from '../firebaseConnect';
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css"; //for css
import { CONSTANTS } from '../constants';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from 'moment';

class EarningList extends Component {
    constructor(props) {
        super(props);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.state = {
            originalData: [],
            showData: [],
            currentPage: 1,
            totalPage: 1,
        }
    }
    
    handleDayChange(selectedDay, modifiers, dayPickerInput) {
        let input = dayPickerInput.getInput();
        this.setState({
            selectedDay: selectedDay,
            formDate: input.value
        });
    }

    componentWillMount() {
        monthlyEarning.on('value', (notes) => {
            var originalData = [];
            var showData = [];
            var totalPage = 1;
            // load data by firebase
            notes.forEach((item) => {
                var data = {};
                data.key = item.key;
                data.title = item.val().title;
                data.date = item.val().date;
                data.amount = item.val().amount;
                originalData.push(data);
            });
            // sort data by date
            originalData = originalData.sort((a,b) => {
                return new Date(b.date) - new Date(a.date);
            });
            // load showData by ITEM_PER_PAGE
            let end = originalData.length < CONSTANTS.ITEM_PER_PAGE ? originalData.length : CONSTANTS.ITEM_PER_PAGE;
            for (let i = 0; i < end; i++) {
                showData.push(originalData[i]);
            }
            // get totalPage
            if (originalData.length % CONSTANTS.ITEM_PER_PAGE) {
                totalPage = ~~(originalData.length / CONSTANTS.ITEM_PER_PAGE) + 1;
            } else {
                totalPage = (originalData.length / CONSTANTS.ITEM_PER_PAGE);
            }

            this.setState({
                originalData,
                showData,
                totalPage
            })
        })
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.originalData != nextState.originalData) nextState.currentPage = 1;
    }

    changeCurrentPage = numPage => {
        let showData = [];
        let start = (numPage - 1) * CONSTANTS.ITEM_PER_PAGE;
        let end = (start + CONSTANTS.ITEM_PER_PAGE) < this.state.originalData.length ? start + CONSTANTS.ITEM_PER_PAGE : this.state.originalData.length;
        for (let i = start; i < end; i++) {
            showData.push(this.state.originalData[i]);
        }
        this.setState({ currentPage: numPage, showData: showData });
    };


    loadData() {
        if (this.state.showData) {
            return this.state.showData.map((value, key) => {
                return (
                    <tr key={value.key}>
                        <th scope="row">{key+1}</th>
                        <td>{value.title}</td>
                        <td>{value.date}</td>
                        <td>{value.amount}</td>
                        <td>
                            {/* {!this.state.isEdit && <input type="button" className="btn btn-outline-warning" value="Edit" 
                                onClick={() => this.edit(value.key, value.title, value.amount, value.date)}/>} */}
                            <input type="button" className="btn btn-outline-danger" 
                                value="Delete" onClick={() => {if(window.confirm('Delete the item?'))this.props.deleteData(value.key)}}/>
                        </td>
                    </tr>
                )
             })
        }
    }

    render() {
        return (
            <div className="col">
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.loadData()}
                    </tbody>
                </table>
                <Pagination
                    currentPage={this.state.currentPage}
                    totalPages={this.state.totalPage}
                    changeCurrentPage={this.changeCurrentPage}
                    theme="circle"
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addData: (item) => {
            dispatch({type: CONSTANTS.ADD_MONTHLY_EARNING, data: item})
        },
        deleteData: (keyData) => {
            dispatch({type: CONSTANTS.DELETE_MONTHLY_EARNING, keyData})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EarningList);