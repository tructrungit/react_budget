import React, { Component } from 'react'
import { connect } from 'react-redux';
import '../css/loginForm.css'
import { CONSTANTS } from './constants'


class Login extends Component {
    handleLogin(e) {
        // e.preventDefault();
        this.props.login();
    }

    render() {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form className="login100-form validate-form">
                            <span className="login100-form-title p-b-26">
                                Welcome
                            </span>
                            <div className="wrap-input100 validate-input">
                                <input className="input100" type="text" name="email" />
                                <span className="focus-input100" data-placeholder="Email" />
                            </div>
                            <div className="wrap-input100 validate-input">
                                <input className="input100" type="password" name="pass" />
                                <span className="focus-input100" data-placeholder="Password" />
                            </div>
                            <div className="container-login100-form-btn">
                                <div className="wrap-login100-form-btn">
                                    <div className="login100-form-bgbtn" />
                                    <button className="login100-form-btn" onClick={(e) => this.handleLogin(e)}>
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLogin: state.userReducer.isLogin,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: () => {
            dispatch({type: CONSTANTS.LOGIN})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);