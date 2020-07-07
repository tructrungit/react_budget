import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom";
import EarningPage from '../component/earning/earningPage';
import ExpensePage from '../component/expanse/expensePage';
import ReportingPage from '../component/reporting/reportingPage';

export default class RouterURL extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={ReportingPage}></Route>
                    <Route exact path="/expense" component={ExpensePage}></Route>
                    <Route exact path="/earning" component={EarningPage}></Route>
                </Switch>
            </div>
        )
    }
}
