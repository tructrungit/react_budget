import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom";
import EarningPage from '../component/earning/earningPage';
import expensePage from '../component/expanse/expensePage';

export default class RouterURL extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={expensePage}></Route>
                    <Route exact path="/earning" component={EarningPage}></Route>
                </Switch>
            </div>
        )
    }
}
