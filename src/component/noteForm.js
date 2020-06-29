import React, {Component} from 'react';
import { connect } from 'react-redux';

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
        // this.props.getData(item);
        this.props.addData(item);
    }

    render() {
        return (
            <div className="col-4">
                <form>
                    <h3>Create or Edit note</h3>
                    <h1>{this.props.testState}</h1>
                    <div className="form-group">
                        <label htmlFor="input-title">Note title</label>
                        <input onChange={(event) => this.changeForm(event)} type="text" className="form-control" id="input-title" aria-describedby="helpId"
                               name="noteTitle" placeholder="Input note title"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="input-content">Note Content</label>
                        <textarea onChange={(event) => this.changeForm(event)} type="text" className="form-control" id="input-content" aria-describedby="helpId"
                                  name="noteContent" placeholder="Input note content"></textarea>
                    </div>
                    <button onClick={() => this.addData(this.state.noteTitle, this.state.noteContent)} className="btn btn-primary btn-block" type="reset" >Save</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        testState: state.test
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addData: (item) => {
            dispatch({type: 'ADD_NOTE', data: item})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);