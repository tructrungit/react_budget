import React, { Component } from 'react'
import Menu from './menu'
import RouterURL from '../router/RouterURL'
import { BrowserRouter as Router } from "react-router-dom";

class HomePage extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Menu/>
                    <RouterURL/>
                </div>
            </Router>
        )
    }
}

export default HomePage;
