import React, { Component } from 'react'
import Menu from './menu'
import RouterURL from '../router/RouterURL'
// import { Router } from 'react-router-dom'

class HomePage extends Component {
    render() {
        return (
                <div>
                    <Menu/>
                    <RouterURL/>
                </div>
        )
    }
}

export default HomePage;
