import React, {Component} from 'react';
import './App.css';
import LoginForm from './component/login/loginForm';
import ExpensePage from './component/expanse/expensePage';
import { connect } from 'react-redux';

class App extends Component {
    render() {
        return (
            <div>
                {!this.props.isLogin && <LoginForm/>}
                {this.props.isLogin && <ExpensePage/>}
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