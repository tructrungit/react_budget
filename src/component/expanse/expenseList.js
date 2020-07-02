import React, {Component} from 'react';
import { expenseData } from '../firebaseConnect';
import ExpenseDetail from './expenseDetail';

class ExpenseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            count: 1
        }
    }

    componentWillMount() {
        expenseData.on('value', (notes) => {
            var arrayData = [];
            notes.forEach((item) => {
                var data = {};
                data.key = item.key;
                data.title = item.val().title;
                data.amount = item.val().amount;
                data.content = item.val().content;
                data.date = item.val().date;
                arrayData.push(data);
            });
            this.setState({
                data: arrayData
            })
        })
    }

    loadData() {
        if (this.state.data) {
            return this.state.data.map((value, key) => {
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
            </div>
        );
    }
}

export default ExpenseList;