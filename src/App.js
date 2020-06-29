import React, {Component} from 'react';
import './App.css';
import Menu from "./component/menu";
import NoteList from "./component/noteList";
import NoteForm from "./component/noteForm";
import { connect } from 'react-redux';
import { CONSTANTS } from './component/constants';

class App extends Component {
    showButton() {
        if (this.props.isOpenForm) {
            return (
                <button type="button" onClick={() => this.props.showHideNoteForm()} className="btn btn-primary btn-lg float-right">Close Form</button>
            )
        } else {
            return (
                <button type="button" onClick={() => this.props.showHideNoteForm()} className="btn btn-secondary btn-lg float-right">Open Form</button>
            )
        }
    }    

    render() {
        return (
            <div>
                <Menu/>
                <div className="container">
                    <br/>
                    <div className="alert alert-info clearfix">
                        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0" style={{textTransform: 'uppercase'}}>Salary management</h2>
                        {this.showButton()}
                    </div>
                    <div className="row">
                        <NoteList/>
                        {this.props.isOpenForm && <NoteForm/>}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isOpenForm: state.noteReducer.isOpenForm
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showHideNoteForm: () => {
            dispatch({type: CONSTANTS.CHANGE_FORM})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

