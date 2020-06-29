import React, { Component } from 'react'

class NoteDetail extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-header" role="tab">
                    <h5 className="mb-0">
                        {this.props.title}
                        <input type="button" className="btn btn-outline-danger float-right" value="Delete"></input>
                        <input type="button" className="btn btn-outline-warning float-right" value="Edit"></input>
                        <a data-toggle="collapse" data-parent="#noteList" href={'#' + this.props.keyId} aria-expanded="true"
                            aria-controls={this.props.keyId} className="btn btn-outline-primary float-right">
                            View
                        </a>
                    </h5>
                </div>
                <div id={this.props.keyId} className="collapse in" role="tabpanel" aria-labelledby={this.props.keyId}>
                    <div className="card-body">
                        {this.props.content}
                    </div>
                </div>
            </div>
        )
    }
}

export default NoteDetail;