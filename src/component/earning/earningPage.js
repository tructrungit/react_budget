import React, { Component } from 'react'
import { salary } from '../firebaseConnect'
import EarningList from './earningList';
import EarningForm from './earningForm';
import { connect } from 'react-redux';
import { CONSTANTS } from '../constants';

class EarningPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSalary: 0
        }
    }

    UNSAFE_componentWillMount() {
        salary.on('value', (items) => {
            let totalSalary = 0
            items.forEach(item => {
                totalSalary += Number(item.val());
            })
            this.setState({totalSalary})
        })
    }

    render() {
        return (
            <div className="container">
                <br/>
                <div className="alert alert-info clearfix">
                    <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0" style={{textTransform: 'uppercase'}}>Earning Management</h2>
                </div>
                <div className="clearfix">
                    {this.props.isOpenForm && <EarningForm/>}
                </div>
                <div className="alert clearfix">
                    {!this.props.isOpenForm && <button type="button" onClick={() => this.props.showHideEarningForm()} className="btn btn-primary btn-lg btn-block">Create Earning Item</button>}
                </div>
                <div className="row">
                    <EarningList/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isOpenForm: state.earningReducer.isOpenForm,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showHideEarningForm: () => {
            dispatch({type: CONSTANTS.CHANGE_EARNING_FORM})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EarningPage);