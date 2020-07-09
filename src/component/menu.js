import React, {Component} from 'react';
import { connect } from 'react-redux';
import { logOutAction } from '../action/userAction';
import { Link } from "react-router-dom";

class Menu extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
                <a className="navbar-brand" href="#">Welcome to {this.props.user}</a>
                <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse"
                        data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                        aria-label="Toggle navigation"/>
                <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavId">
                    <ul className="navbar-nav mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/expense">Expense</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/earning">Income</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => {if(window.confirm('Are you sure you want to logout?'))this.props.logOutAction()}} href="#">Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.loginReducer.user
    }
}

const mapDispatchToProps = { logOutAction };

export default connect(mapStateToProps, mapDispatchToProps)(Menu);