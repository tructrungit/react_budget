import React, {Component} from 'react';
import { connect } from 'react-redux';
import { CONSTANTS } from '../constants';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import '../../css/form.css'

class EarningForm extends Component {
    constructor(props) {
        super(props);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.state = {
            formTitle: this.props.editData.title || '',
            formAmount: this.props.editData.amount || '',
            formDate: this.props.editData.date || moment().format('YYYY-M-DD'),
            selectedDay: moment(this.props.editData.date) || moment()
        }
    }

    changeForm = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleDayChange(date, dateString) {
        if (dateString) {
            this.setState({
                selectedDay: date,
                formDate: dateString
            });
        }
    }
    
    addData = (title, amount, date) => {
        let item = {};
        item.title = title;
        item.amount = amount * 1000;
        item.date = date;
        item.milliseconds = moment(date).valueOf();
        if (this.props.isEdit) item.key = this.props.editData.key;
        this.props.addData(item);
        this.props.showHideEarningForm();
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="form_main">
                <h4 className="heading"><strong>{this.props.isEdit ? 'Edit' : 'Create'} </strong> Income <span /></h4>
                <div className="form">
                <form method="post" onSubmit={() => this.addData(this.state.formTitle, this.state.formAmount, this.state.formDate)}>
                        <div className="form-group">
                            <label htmlFor="input-title" className="font-weight-bold">Title</label>
                            <input onChange={(event) => this.changeForm(event)} type="text" className="txt" id="input-title" aria-describedby="helpId"
                                name="formTitle"  defaultValue={this.state.formTitle} required></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="input-amount" className="font-weight-bold">Amount</label>
                            <input onChange={(event) => this.changeForm(event)} type="number" min="0" id="input-amount" aria-describedby="helpId"
                                name="formAmount" defaultValue={this.state.formAmount} required></input>
                            <small id="formAmountHelp" className="form-text text-muted"></small>
                            <DatePicker 
                            onChange={this.handleDayChange} 
                            defaultValue={this.state.selectedDay}
                            format={CONSTANTS.DAY_FORMAT}/>
                        </div>       
                        <div className="form-group">           
                            
                        </div>    
                        <br/>
                        {/* <button className="txt2" type="button" onClick={() => this.addData(this.state.formTitle, this.state.formAmount, this.state.formDate)} >Save</button> */}
                        <button className="txt2" type="submit" >Save</button>
                        <button onClick={() => this.props.showHideEarningForm()} className="txt2 btn-info" type="button" >Cancel</button>
                    </form>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isEdit: state.earningReducer.isEdit,
        editData: state.earningReducer.editData
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addData: (item) => {
            dispatch({type: CONSTANTS.ADD_EARNING, data: item})
        },
        showHideEarningForm: () => {
            dispatch({type: CONSTANTS.CHANGE_EARNING_FORM})
        },
        deleteData: (keyData) => {
            dispatch({type: CONSTANTS.DELETE_EARNING, keyData})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EarningForm);