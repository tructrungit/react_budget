import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CONSTANTS } from '../constants';

class ExpenseDetail extends Component {
    edit() {
        this.props.editData(this.props.note);
        this.props.showHideNoteForm();
        window.scrollTo(0, 0)
    }

    formatAmount(amount) {
        if (!amount) amount = 0;
        return Number(amount).toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    }

    render() {
        return (
            <div className="card border-dark mb-3">
                <div className="card-header" role="tab">
                    <h5 className="mb-0 text-success">
                        {this.formatAmount(this.props.amount)}
                        <div className="btn-group float-right">
                            <a data-toggle="collapse" data-parent="#noteList" href={'#' + this.props.keyId} aria-expanded="true"
                                aria-controls={this.props.keyId} className="btn btn-outline-primary">View
                            </a>
                            {!this.props.isEdit && !this.props.isOpenForm && <input type="button" className="btn btn-outline-warning" value="Edit" onClick={() => this.edit()}/>}
                            <input type="button" className="btn btn-outline-danger" value="Delete" onClick={() => {if(window.confirm('Delete the item?'))this.props.deleteData(this.props.keyId)}}/>
                        </div>
                    </h5>
                </div>
                <div id={this.props.keyId} className="collapse in" role="tabpanel" aria-labelledby={this.props.keyId}>
                    <div className="card-body text-success">
                        <h5 className="card-title">{this.props.title}</h5>
                        <p className="card-text"><span className="font-weight-bold">Amount: </span>{this.formatAmount(this.props.amount)}</p>
                        <p className="card-text"><span className="font-weight-bold">Content: </span>{this.props.content}</p>
                        <p className="card-text"><span className="font-weight-bold">Date: </span>{this.props.date}</p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isOpenForm: state.expenseReducer.isOpenForm,
        isEdit: state.expenseReducer.isEdit,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showHideNoteForm: () => {
            dispatch({type: CONSTANTS.CHANGE_EXPENSE_FORM})
        },
        editData: (editData) => {
            dispatch({type: CONSTANTS.GET_EDIT_EXPENSE_DATA, editData})
        },
        deleteData: (keyData) => {
            dispatch({type: CONSTANTS.DELETE_EXPENSE_DATA, keyData})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseDetail);
