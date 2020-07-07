import React, {Component} from 'react';
import { expenseData } from '../firebaseConnect';
import ExpenseDetail from './expenseDetail';
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css"; //for css
import { CONSTANTS } from '../constants';

class ExpenseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalData: [],
            showData: [],
            currentPage: 1,
            totalPage: 1
        }
    }    

    UNSAFE_componentWillMount() {
        expenseData.on('value', (notes) => {
            var originalData = [];
            var showData = [];
            var totalPage = 1;
            // load data by firebase
            notes.forEach((item) => {
                var data = {};
                data.key = item.key;
                data.title = item.val().title;
                data.amount = item.val().amount;
                data.content = item.val().content;
                data.date = item.val().date;
                originalData.push(data);
            });
            // sort data by date
            originalData = originalData.sort((a,b) => {
                return new Date(b.date) - new Date(a.date);
            });
            // load showData by ITEM_PER_PAGE 
            for (let i = 0; i < CONSTANTS.ITEM_PER_PAGE; i++) {
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

    UNSAFE_componentWillUpdate(nextProps, nextState) {
        if (this.state.originalData !== nextState.originalData) nextState.currentPage = 1;
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
                    <ExpenseDetail key={value.key} keyId={value.key} title={value.title} amount={value.amount} content={value.content} note={value} date={value.date}/>
                )
             })
        }
    }

    render() {
        return (
            <div className="col">
                <div id="noteList" role="tablist" aria-multiselectable="true">
                    {this.loadData()}
                </div>
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

export default ExpenseList;