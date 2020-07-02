import React, { Component } from 'react'
import Menu from '../menu'
import { connect } from 'react-redux';
import { CONSTANTS } from '../constants';
import ExpenseForm from './expenseForm';
import ExpenseList from './expenseList';

class ExpensePage extends Component {
    loadHomePage() {
        return (
            <div>
                <Menu/>
                <div className="container">
                    <br/>
                    <div className="alert alert-info clearfix">
                        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0" style={{textTransform: 'uppercase'}}>Expense Management</h2>
                    </div>
                    <div className="clearfix">
                        {this.props.isOpenForm && <ExpenseForm/>}
                    </div>
                    <div className="alert clearfix">
                        {!this.props.isOpenForm && <button type="button" onClick={() => this.props.showHideNoteForm()} className="btn btn-primary btn-lg btn-block">Create Expense Item</button>}
                    </div>
                    <div className="row">
                        <ExpenseList/>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.loadHomePage()}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isOpenForm: state.expenseReducer.isOpenForm,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showHideNoteForm: () => {
            dispatch({type: CONSTANTS.CHANGE_EXPENSE_FORM})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensePage);