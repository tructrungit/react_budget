import React, { Component } from 'react'
import { connect } from 'react-redux';
import { CONSTANTS } from '../constants';
import ExpenseForm from './expenseForm';
import ExpenseList from './expenseList';
import LoadingComponent from '../loadingComponent';

class ExpensePage extends Component {
    UNSAFE_componentWillMount() {
        this.props.updateIsLoading(true);
    }

    render() {
        return (
            <div>
                <div className="container">
                    <br/>
                    <div className="alert alert-info clearfix">
                        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0" style={{textTransform: 'uppercase'}}>Expense Management</h2>
                    </div>
                    <div className="clearfix">
                        {this.props.isOpenForm && <ExpenseForm/>}
                    </div>
                    <div className="alert clearfix">
                        {!this.props.isOpenForm && <button type="button" onClick={() => this.props.showHideExpanseForm()} className="btn btn-primary btn-lg btn-block">Create Expense Item</button>}
                    </div>
                    {this.props.isLoading && <LoadingComponent/>}
                    <div className="row">
                        <ExpenseList/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isOpenForm: state.expenseReducer.isOpenForm,
        isLoading: state.expenseReducer.isLoading
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showHideExpanseForm: () => {
            dispatch({type: CONSTANTS.CHANGE_EXPENSE_FORM})
        },
        updateIsLoading: (status) => {
            dispatch({type: CONSTANTS.UPDATE_IS_LOADING, status})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensePage);
