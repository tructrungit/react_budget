import React, {Component} from 'react';
import { connect } from 'react-redux';
import { CONSTANTS } from './constants';
import '../css/form.css'

class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteTitle: '',
            noteContent: ''
        }
    }

    changeForm = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    addData = (title, content) => {
        let item = {};
        item.title = title;
        item.content = content;
        if (this.props.isEdit) item.key = this.props.editData.key;
        this.props.addData(item);
        this.props.showHideNoteForm();
    }

    render() {
        return (
            <div className="col-md-4">
                <div className="form_main">
                <h4 className="heading"><strong>{this.props.isEdit ? 'Edit' : 'Create'} </strong> Note <span /></h4>
                <div className="form">
                    <form method="post" id="contactFrm" name="contactFrm">
                    <input onChange={(event) => this.changeForm(event)} type="text" className="txt" id="input-title" aria-describedby="helpId"
                            name="noteTitle" placeholder="Your title" defaultValue={this.props.editData.title}></input>
                    <textarea onChange={(event) => this.changeForm(event)} type="text" className="txt" id="input-content" aria-describedby="helpId"
                                  name="noteContent" placeholder="Your content" defaultValue={this.props.editData.content}></textarea>
                    <button onClick={() => this.addData(this.state.noteTitle, this.state.noteContent)} className="txt2" type="reset" >Save</button>
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