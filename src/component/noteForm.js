import React, {Component} from 'react';
import { connect } from 'react-redux';
import { CONSTANTS } from './constants';

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
            <div className="col-4">
                <form>
                    <h3>{this.props.isEdit ? 'Edit ' : 'Create '} Note</h3>
                    <div className="form-group">
                        <label htmlFor="input-title">Title</label>
                        <input onChange={(event) => this.changeForm(event)} type="text" className="form-control" id="input-title" aria-describedby="helpId"
                               name="noteTitle" placeholder="Input note title" defaultValue={this.props.editData.title}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="input-content">Content</label>
                        <textarea onChange={(event) => this.changeForm(event)} type="text" className="form-control" id="input-content" aria-describedby="helpId"
                                  name="noteContent" placeholder="Input note content" defaultValue={this.props.editData.content}></textarea>
                    </div>
                    <button onClick={() => this.addData(this.state.noteTitle, this.state.noteContent)} className="btn btn-primary btn-block" type="reset" >Save</button>
                </form>
            </div>
        );
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