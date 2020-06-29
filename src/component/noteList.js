import React, {Component} from 'react';

class NoteList extends Component {
    render() {
        return (
            <div className="col">
                <div id="noteList" role="tablist" aria-multiselectable="true">
                    <div className="card">
                        <div className="card-header" role="tab" id="note-1">
                            <h5 className="mb-0">
                                <a data-toggle="collapse" data-parent="#noteList" href="#note1" aria-expanded="true"
                                   aria-controls="note1">
                                    Note 31/3/2018
                                </a>
                            </h5>
                        </div>
                        <div id="note1" className="collapse in" role="tabpanel" aria-labelledby="note1">
                            <div className="card-body">
                                It is a long established fact that a reader will be distracted by the readable content
                                of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
                                more-or-less normal distribution of letters, as opposed to using 'Content here, content
                                here', making it look like readable English. Many desktop publishing packages and web
                                page editors now use Lorem Ipsum as their default model text, and a search for 'lorem
                                ipsum' will uncover many web sites still in their infancy. Various versions have evolved
                                over the years, sometimes by accident, sometimes on purpose (injected humour and the
                                like).
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" role="tab" id="section2HeaderId">
                            <h5 className="mb-0">
                                <a data-toggle="collapse" data-parent="#noteList" href="#note2" aria-expanded="true"
                                   aria-controls="note2">
                                    Note 01/4/2018
                                </a>
                            </h5>
                        </div>
                        <div id="note2" className="collapse in" role="tabpanel" aria-labelledby="section2HeaderId">
                            <div className="card-body">
                                It is a long established fact that a reader will be distracted by the readable content
                                of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
                                more-or-less normal distribution of letters, as opposed to using 'Content here, content
                                here', making it look like readable English. Many desktop publishing packages and web
                                page editors now use Lorem Ipsum as their default model text, and a search for 'lorem
                                ipsum' will uncover many web sites still in their infancy. Various versions have evolved
                                over the years, sometimes by accident, sometimes on purpose (injected humour and the
                                like).
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NoteList;