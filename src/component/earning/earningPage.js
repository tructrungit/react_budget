import React, { Component } from 'react'
import { salary } from '../firebaseConnect'
import EarningList from './earningList';

export default class EarningPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSalary: 0
        }
    }

    componentWillMount() {
        salary.on('value', (items) => {
            let totalSalary = 0
            items.forEach(item => {
                totalSalary += parseInt(item.val());
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
                <div className="row">
                    <EarningList/>
                </div>
            </div>
        )
    }
}
