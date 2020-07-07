import React, { Component } from 'react'

export default class ReportingPage extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <br/>
                    <div className="alert alert-info clearfix">
                        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0" style={{textTransform: 'uppercase'}}>Reporting Page</h2>
                    </div>
                    {/* <div className="alert clearfix">
                        {!this.props.isOpenForm && <button type="button" onClick={() => this.props.showHideExpanseForm()} className="btn btn-primary btn-lg btn-block">Create Expense Item</button>}
                    </div> */}
                    <div className="row">
                        {/* <ExpenseList/> */}
                    </div>
                </div>
            </div>
        )
    }
}
