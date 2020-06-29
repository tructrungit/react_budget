import React, {Component} from 'react';
import './App.css';
import Menu from "./component/menu";
import NoteList from "./component/noteList";
import NoteForm from "./component/noteForm";
import { connect } from 'react-redux';

class App extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <div className="container">
                    <div className="row">
                        <NoteList/>
                        {this.props.isShowNoteForm && <NoteForm/>}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isShowNoteForm: state.state
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showHideNoteForm: () => {
            dispatch({type: 'CHANGE_IS_SHOW_FORM_STATE'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

