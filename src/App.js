import React, {Component} from 'react';
import './App.css';
import LoginForm from './component/login/loginForm';
import { connect } from 'react-redux';
import HomePage from './component/home';
var schedule = require('node-schedule');
var cronExpress = '*/5 * * * * *';
var j = schedule.scheduleJob(cronExpress, function(fireDate){
    console.log('running job!');
    console.log(fireDate)
});

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