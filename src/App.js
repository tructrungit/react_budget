import React, {Component} from 'react';
import './App.css';
import Menu from "./component/menu";
import NoteList from "./component/noteList";
import NoteForm from "./component/noteForm";
import { connect } from 'react-redux';
import { CONSTANTS } from './component/constants';

class App extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <div className="container">
                    <br/>
                    <div className="alert alert-info clearfix">
                        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0" style={{textTransform: 'uppercase'}}>Salary management</h2>
                    </div>
                    <div className="clearfix">
                        {this.props.isOpenForm && <NoteForm/>}
                    </div>
                    <div className="alert clearfix">
                        {!this.props.isOpenForm && <button type="button" onClick={() => this.props.showHideNoteForm()} className="btn btn-primary btn-lg btn-block">Create Note</button>}
                    </div>
                    <div className="row">
                        <NoteList/>
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

