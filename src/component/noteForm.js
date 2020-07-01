import React, {Component} from 'react';
import { connect } from 'react-redux';
import { CONSTANTS } from './constants';
import '../css/form.css'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from 'moment';


class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.state = {
            noteTitle: this.props.editData.title || '',
            noteContent: this.props.editData.content || '',
            noteDay: this.props.editData.date || moment().format('YYYY-M-DD'),
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
            noteDay: input.value
        });
    }
    
    addData = (title, content, date) => {
        let item = {};
        item.title = title;
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
                <h4 className="heading"><strong>{this.props.isEdit ? 'Edit' : 'Create'} </strong> Note <span /></h4>
                <div className="form">
                    <form method="post" id="contactFrm" name="contactFrm">
                        <input onChange={(event) => this.changeForm(event)} type="text" className="txt" id="input-title" aria-describedby="helpId"
                                name="noteTitle" placeholder="Your title" defaultValue={this.state.noteTitle}></input>
                        <textarea onChange={(event) => this.changeForm(event)} type="text" className="txt" id="input-content" aria-describedby="helpId"
                                    name="noteContent" placeholder="Your content" defaultValue={this.state.noteContent}></textarea>
                        <DayPickerInput
                            value={this.state.selectedDay}
                            onDayChange={this.handleDayChange}
                        />
                        <br/>
                        <button onClick={() => this.addData(this.state.noteTitle, this.state.noteContent, this.state.noteDay)} className="txt2" type="reset" >Save</button>
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
        isEdit: state.noteReducer.isEdit,
        editData: state.noteReducer.editData
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addData: (item) => {
            dispatch({type: CONSTANTS.ADD_NOTE, data: item})
        },
        showHideNoteForm: () => {
            dispatch({type: CONSTANTS.CHANGE_FORM})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);