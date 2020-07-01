import React, {Component} from 'react';
import './App.css';
import LoginForm from './component/loginForm';
import HomePage from './component/homePage';
import { connect } from 'react-redux';

class App extends Component {
    render() {
        return (
            <div>
                {!this.props.isLogin && <LoginForm/>}
                {this.props.isLogin && <HomePage/>}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLogin: state.loginReducer.isLogin,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);