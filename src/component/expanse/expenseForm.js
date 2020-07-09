import React, {Component} from 'react';
import { connect } from 'react-redux';
import { CONSTANTS } from '../constants';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import '../../css/form.css'



class ExpenseForm extends Component {
    constructor(props) {
        super(props);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.state = {
            formTitle: this.props.editData.title || '',
            formAmount: this.props.editData.amount || '',
            formContent: this.props.editData.content || '',
            formDate: this.props.editData.date || moment().format('YYYY-M-DD'),
            selectedDay: this.props.editData.date || moment().toDate()
        }
    }

    changeForm = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleDayChange(selectedDay, modifiers, dayPickerInput) {
        let input = dayPickerInput.getInput();
        this.setState({
            selectedDay: selectedDay,
            formDate: input.value
        });
    }
    
    addData = (title, amount, content, date) => {
        let item = {};
        item.title = title;
        item.amount = amount * 1000;
        item.content = content;
        item.date = date;
        if (this.props.isEdit) item.key = this.props.editData.key;
        this.props.addData(item);
        this.props.showHideNoteForm();
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="form_main">
                <h4 className="heading"><strong>{this.props.isEdit ? 'Edit' : 'Create'} </strong> Expense <span /></h4>
                <div className="form">
                    <form method="post" onSubmit={() => this.addData(this.state.formTitle, this.state.formAmount, this.state.formContent, this.state.formDate)}>
                        <div className="form-group">
                            <label htmlFor="input-title" className="font-weight-bold">Title</label>
                            <input onChange={(event) => this.changeForm(event)} type="text" className="txt" id="input-title" aria-describedby="helpId"
                                name="formTitle"  defaultValue={this.state.formTitle} required></input>
                            {/* <small id="formTitleHelp" className="form-text text-muted">Input title of expense</small> */}
                        </div>
                        <div className="form-group">
                            <label htmlFor="input-amount" className="font-weight-bold">Amount</label>
                            <input onChange={(event) => this.changeForm(event)} type="number" min="0" id="input-amount" aria-describedby="helpId"
                                name="formAmount" defaultValue={this.state.formAmount} required ></input>
                            <small id="formAmountHelp" className="form-text text-muted">Amount will auto multiple 1000, ex: your input 100 == 100.000</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="input-content" className="font-weight-bold">Conent</label>
                            <textarea onChange={(event) => this.changeForm(event)} type="text" className="txt" id="input-content" aria-describedby="helpId"
                                name="formContent" defaultValue={this.state.formContent}></textarea>
                            {/* <small id="formContentHelp" className="form-text text-muted">Input content of expense</small> */}
                        </div>         
                        <div className="form-group">           
                            <DayPickerInput
                                value={this.state.selectedDay}
                                onDayChange={this.handleDayChange}
                            />
                            {/* <small id="formDateHelp" className="form-text text-muted">Select date of expense</small> */}
                        </div>    
                        <br/>
                        <button className="txt2" type="submit" >Save</button>
                        <button onClick={() => this.props.showHideNoteForm()} className="txt2 btn-info" type="button" >Cancel</button>
                    </form>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isEdit: state.expenseReducer.isEdit,
        editData: state.expenseReducer.editData
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addData: (item) => {
            dispatch({type: CONSTANTS.ADD_EXPENSE, data: item})
        },
        showHideNoteForm: () => {
            dispatch({type: CONSTANTS.CHANGE_EXPENSE_FORM})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);