import React, { Component } from 'react'
import Menu from './menu'
import ExpensePage from './expanse/expensePage'

class HomePage extends Component {
    loadHomePage() {
        return (
            <div>
                <Menu/>
                <ExpensePage/>
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

export default HomePage;
