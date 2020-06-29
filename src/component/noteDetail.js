import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CONSTANTS } from './constants';

class NoteDetail extends Component {
    edit() {
        if (!this.props.isOpenForm) this.props.showHideNoteForm();
        this.props.editData(this.props.note)
    }

    render() {
        return (
            <div className="card">
                <div className="card-header" role="tab">
                    <h5 className="mb-0">
                        {this.props.title}
                        <div className="btn-group float-right">
                            <a data-toggle="collapse" data-parent="#noteList" href={'#' + this.props.keyId} aria-expanded="true"
                                aria-controls={this.props.keyId} className="btn btn-outline-primary">View
                            </a>
                            <input type="button" className="btn btn-outline-warning" value="Edit" onClick={() => this.edit()}></input>
                            <input type="button" className="btn btn-outline-danger" value="Delete"></input>
                        </div>
                    </h5>
                </div>
                <div id={this.props.keyId} className="collapse in" role="tabpanel" aria-labelledby={this.props.keyId}>
                    <div className="card-body">
                        {this.props.content}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isOpenForm: state.noteReducer.isOpenForm,
        isEdit: state.noteReducer.isEdit,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showHideNoteForm: () => {
            dispatch({type: CONSTANTS.CHANGE_FORM})
        },
        editData: (editData) => {
            dispatch({type: CONSTANTS.GET_EDIT_DATA, editData})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetail);
