import React, { Component } from 'react'
import { connect } from 'react-redux';
import './loginForm.css'
import { getUser, googleLogin } from '../../action/userAction';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: ""
        }
    }

    changeForm = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleLogin() {
        this.props.getUser(this.state.userName, this.state.password);
    }

    loadLoginPage() {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <span className="login100-form-title p-b-26">
                            Welcome
                        </span>
                        <div className="wrap-input100">
                            <input onChange={(event) => this.changeForm(event)} type="text" className="input100" id="input-userName" aria-describedby="helpId"
                                name="userName" placeholder="Email"></input>
                        </div>
                        <div className="wrap-input100">
                            <input onChange={(event) => this.changeForm(event)} type="password" className="input100" id="input-password" aria-describedby="helpId"
                                name="password" placeholder="Password"></input>
                        </div>
                        <div className="container-login100-form-btn">
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button type="button" onClick={() => this.handleLogin()} className="login100-form-btn">Login</button>
                            </div>
                        </div>
                        <br />
                        <div className="container-login100-form-btn">
                            <button className="loginBtn loginBtn--google" id="btnGoogle" onClick={() => this.props.googleLogin()}>Login with Google</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.loadLoginPage()}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    }
}

const mapDispatchToProps = { getUser, googleLogin };

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);