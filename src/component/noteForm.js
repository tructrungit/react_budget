import React, {Component} from 'react';

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
        console.log(item);
        this.props.getData(item);
    }

    render() {
        return (
            <div className="col-4">
                <form>
                    <h3>Create or Edit note</h3>
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

export default NoteForm;